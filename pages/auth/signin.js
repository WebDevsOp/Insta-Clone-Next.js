import { getProviders, signIn as providersSignin } from "next-auth/react";
import Header from "../../components/Header";
const signIn = ({ providers }) => {
  console.log(providers);
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen p-2">
        <img src="https://links.papareact.com/ocw" className="w-80" alt="" />
        <p className="font-xs italic">This is not Real App only for educational purpopses</p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => providersSignin(provider.id , {callbackUrl : '/'})}
                className="p-3 text-white bg-blue-500 rounded-lg"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
