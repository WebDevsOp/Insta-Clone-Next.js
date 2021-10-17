import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { useSession } from 'next-auth/react'
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

const Modal = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    // 1) Create a Post and add to Firestore
    // 2) Get the Post ID for the newly created Post
    // 3) Upload Image to Firebase storage with the post ID
    // 4) Get a Download URL from Firebase storage and update original post with image

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session?.user?.username,
      caption: captionRef.current.value,
      profileImg: session?.user?.image,
      timeStamp: serverTimestamp()
    })

    console.log('New Doc added with ID: ' + docRef.id)

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
      const downloadUrl = await getDownloadURL(imageRef)
      await updateDoc(doc(db, 'posts', docRef.id), {
        image: downloadUrl,
      })
    })

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  }

  const addImageToPost = (e) => {
    // console.log(e);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
    console.log(selectedFile);
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="min-h-[800px] flex items-end justify-center pb-20 pt-4 px-4 text-center sm:block sm:p-0 sm:min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom pb-4 pt-5 px-4 text-left bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:align-middle sm:my-8 sm:p-6 sm:w-full sm:max-w-sm">
              <div>
                {selectedFile ? (
                  <img src={selectedFile} className="w-full object-contain cursor-pointer" onClick={() => setSelectedFile(null)} />
                ) : (
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer" onClick={() => {
                    filePickerRef.current.click()
                  }}>
                    <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Upload a Photo
                    </Dialog.Title>
                  </div>


                  <div>
                    <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                  </div>

                  <div>
                    <input type="text" className="border-none focus:ring-0 w-full text-center" placeholder="Please enter a caption..." ref={captionRef} />
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      disabled={!selectedFile}
                      className="inline-flex justify-center px-4 py-2 w-full text-white text-base font-medium bg-red-600 hover:bg-red-700 border border-transparent rounded-md focus:outline-none shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                      onClick={uploadPost}
                    >
                      {loading ? 'Uploading...' : 'Upload Post'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog >
    </Transition.Root >
  );
};

export default Modal;
