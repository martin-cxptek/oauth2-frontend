import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type LoginProps = {
  handleCallbackResponse: (res: any) => unknown;
};

const Login: React.FC<LoginProps> = ({
  handleCallbackResponse
}) => {
  const navigate = useNavigate();

  async function internalHandleCallbackResponse(response: any) {
    const rs = await handleCallbackResponse(response);
    if (rs) {
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: `${process.env.REACT_APP_CLIENT_ID}`,
      callback: internalHandleCallbackResponse
    });

    const signInButton = document.getElementById("googleSignInButton");
    if (signInButton) {
      google.accounts.id.renderButton(
        signInButton,
        { theme: "outline", size: "large", type: "standard", width: "350px" }
      )
    }

    google.accounts.id.prompt();
  }, []);

  // <div id="googleSignInButton"></div>
  return(
    <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
      <div className="w-full py-8">
          <div className="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
              </svg>
              <h1 className="text-3xl font-bold text-blue-600 tracking-wider">Template</h1>
          </div>
          <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">

              <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Sign In</h2>  
              
              <div className="flex items-center justify-between">
                  <div className="w-full h-[1px] bg-gray-300"></div>
                  <span className="text-sm uppercase mx-6 text-gray-400">0</span>
                  <div className="w-full h-[1px] bg-gray-300"></div>
              </div>

              <div className="text-sm">
                  <span id="googleSignInButton" className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2     bg-gray-100 hover:bg-gray-200 rounded">
                    Sign up with Google
                  </span>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Login;