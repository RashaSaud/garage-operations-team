import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "src/config/config";
import { MdOutlineDone } from "react-icons/md";
import { UserContext } from "src/context/auth-context";
import { useNavigate } from "react-router-dom";
function OperationForm() {
  const [zone, setZone] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [snackbar, setSnackbar] = useState(false);
 const nav = useNavigate()
  const { user } = useContext(UserContext);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const options = [
    "Ground floor A",
    "Ground floor B",
    "Basement floor A",
    "Basement floor B",
    "Hackathon"
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "notices"), {
        zone,
        location,
        date: today.toLocaleDateString(),
        description,
        addedBy: user.email,
        isShared: false,
      }).then(() => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000); 
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#eeeae1] flex flex-col px-4">
        
      <div className="py-2 px-2 ">
        
        <svg
          width="123"
          height="84"
          viewBox="0 0 323 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44.3 47.8406C44.5647 47.8406 47.187 49.3803 52.1669 52.4596V52.6401C52.1669 54.3482 51.0723 56.6457 48.883 59.5326L48.6665 59.6769C48.2335 59.6769 45.5751 58.1372 40.6914 55.0579V54.3361C41.4612 51.4492 42.6641 49.284 44.3 47.8406V47.8406Z"
            fill="#221A29"
          />
          <path
            d="M69.0535 65.8479V66.0284C67.201 67.7605 64.5908 69.649 61.2227 71.6939C58.0952 73.7629 53.8009 74.7974 48.3399 74.7974C36.4554 74.7974 28.9975 72.6923 25.9663 68.4822C24.186 66.4614 23.2959 64.0196 23.2959 61.1567C23.2959 56.3933 25.6054 50.8961 30.2245 44.6652C33.6166 40.6957 36.8524 37.7847 39.9317 35.9323C42.0488 34.8016 43.1434 34.1641 43.2156 34.0197C39.4626 33.1536 36.6118 32.7206 34.6631 32.7206H33.5444C30.1042 32.7206 27.3616 34.0077 25.3167 36.5819H24.992C24.7754 36.5819 24.6672 36.5097 24.6672 36.3653V36.0406C24.8356 33.9235 25.9182 31.5057 27.915 28.7872C30.5854 25.5394 34.2902 23.9155 39.0296 23.9155H39.1739C42.0849 23.9155 48.2557 25.1184 57.6862 27.5242C61.1505 28.3181 64.2299 28.715 66.9244 28.715H67.3574C67.5017 28.715 67.5739 28.7752 67.5739 28.8955C66.2748 32.0711 64.8674 35.0301 63.3518 37.7727H60.2484C49.1097 37.7727 38.8491 42.0189 29.4667 50.5112C28.9615 51.0164 28.4442 51.666 27.915 52.4599V53.8312C27.915 57.3676 30.0561 60.2666 34.3383 62.528C38.5484 64.5969 43.4562 65.6314 49.0616 65.6314H68.7287C68.9452 65.6314 69.0535 65.7036 69.0535 65.8479V65.8479Z"
            fill="#221A29"
          />
          <path
            d="M85.3287 42.7914C84.6791 47.0736 83.2357 51.4521 80.9983 55.9268H79.5909C79.5909 48.3006 77.9791 34.3111 74.7554 13.9584L79.4827 4.35938H80.8901C83.8491 24.0144 85.3287 36.8251 85.3287 42.7914V42.7914Z"
            fill="#221A29"
          />
          <path
            d="M275.468 11.7926L280.593 15.1847V15.8343L276.659 23.7733L276.226 23.9176L275.216 23.4124C276.491 30.2929 277.128 35.9224 277.128 40.3009C277.128 45.4492 275.829 50.6577 273.231 55.9263H261.539H260.637H260.24L260.204 55.8902C256.74 55.7458 253.564 54.0137 250.713 50.6216C250.376 50.0683 250.088 49.563 249.847 49.106C249.005 51.0787 248.067 53.3521 247.032 55.9263H138.557H137.077H125.457H124.23H118.348C116.977 60.004 114.415 64.5509 110.59 69.4948C107.871 72.5501 106.091 74.1379 105.249 74.2582C103.733 74.6431 102.338 74.8356 101.063 74.8356C97.9113 74.619 92.318 72.1531 84.2827 67.4378L84.7518 65.6696C87.5425 66.6319 90.3452 67.1732 93.16 67.2935C102.182 67.2935 109.098 63.1676 113.91 54.9159L114.74 52.9311C110.914 50.3088 108.894 47.0971 108.677 43.296C109.327 40.6016 110.409 37.8831 111.925 35.1405L113.26 35.2127C114.102 42.1653 117.891 46.0146 124.627 46.7603H125.457H137.077H138.557H248.043C247.586 45.0282 246.467 43.5607 244.687 42.3578C239.947 39.952 233.536 38.7492 225.453 38.7492H158.765C152.294 38.7492 149.058 37.5463 149.058 35.1405V34.3827C149.058 31.8567 151.427 27.8511 156.167 22.3659C161.099 17.7469 166.042 14.5231 170.998 12.6948C175.208 10.9626 179.382 9.59134 183.52 8.58092C187.923 7.52239 192.686 6.6082 197.811 5.83835L197.991 6.12705L194.491 13.8495C183.544 16.1831 176.147 18.1198 172.297 19.6594C165.128 22.0412 159.439 24.916 155.229 28.2841C157.682 29.3426 161.399 29.8719 166.379 29.8719H226.211C238.095 29.8719 246.142 31.9649 250.352 36.1509C251.146 37.3298 251.7 38.5928 252.012 39.94L253.023 41.7443C254.202 43.9336 256.523 45.6056 259.987 46.7603H260.24H261.539H271.752C271.752 42.3097 270.236 32.8069 267.205 18.2521C264.438 16.5921 263.055 14.3066 263.055 11.3957C263.055 8.55686 264.414 5.36923 267.133 1.83276L268.143 2.41015L267.854 3.88969C267.854 6.24733 270.392 8.88164 275.468 11.7926V11.7926Z"
            fill="#221A29"
          />
          <path
            d="M294.162 4.35938C297.121 24.0144 298.601 36.8251 298.601 42.7914C297.951 47.0736 296.508 51.4521 294.27 55.9268H292.863C292.863 48.3006 291.251 34.3111 288.027 13.9584L292.755 4.35938H294.162Z"
            fill="#221A29"
          />
          <path
            d="M312.44 4.90775C312.44 2.20127 314.641 0 317.347 0C320.018 0 322.219 2.20127 322.219 4.90775C322.219 7.57814 320.018 9.77942 317.347 9.77942C314.641 9.77942 312.44 7.57814 312.44 4.90775Z"
            fill="#221A29"
          />
          <path
            d="M10.1793 4.90775C10.1793 7.57814 8.01414 9.77942 5.30766 9.77942C2.60118 9.77942 0.399902 7.57814 0.399902 4.90775C0.399902 2.20127 2.60118 0 5.30766 0C8.01414 0 10.1793 2.20127 10.1793 4.90775Z"
            fill="#221A29"
          />
          <path
            d="M10.1793 78.524C10.1793 81.2305 8.01414 83.4318 5.30766 83.4318C2.60118 83.4318 0.399902 81.2305 0.399902 78.524C0.399902 75.8536 2.60118 73.6523 5.30766 73.6523C8.01414 73.6523 10.1793 75.8536 10.1793 78.524Z"
            fill="#221A29"
          />
          <path
            d="M322.219 78.524C322.219 81.2305 320.018 83.4318 317.347 83.4318C314.641 83.4318 312.44 81.2305 312.44 78.524C312.44 75.8536 314.641 73.6523 317.347 73.6523C320.018 73.6523 322.219 75.8536 322.219 78.524Z"
            fill="#221A29"
          />
        </svg>
      </div>
      
      <div className=" flex  justify-center w-full h-full">
        {snackbar ? (
          <div className=" absolute z-50 ">
            <div className="w-[487px]  flex gap-2 mobile:w-[250px] px-5 font-plusJakartaSansRegular  h-[47px] rounded-lg  bg-green-100 border border-green-500/50  items-center content-center flex-row">
              <MdOutlineDone className="text-green-500" />
              <p className="text-[13px]">data has been send successfully</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className=" grid h-[400px] w-96   px-3 text-end   ">
          <div className=" items-center justify-center content-center grid  relative  ">
          

            <div className="bg-[#eeeae1]  grid   h-[350px] ">
              <form
                onSubmit={handleSubmit}
                className=" px-3  flex items-center justify-center content-center flex-col"
              >
                <div className="mb-4 ">
                  <label
                    htmlFor="zone"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Zone
                  </label>

                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      className="inline-flex justify-center w-[300px] rounded-md border border-gray-300 shadow-sm px-4 py-2   
 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      onClick={toggleDropdown}
                    >
                      {zone ? zone : "select zone"}
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1   
 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div
                        className="origin-top-right   
 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {" "}
                           
                          {options.map((option) => (
                            <a
                            href="/#"
                              key={option}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                              onClick={() => {
                                setZone(option);
                                setIsOpen(false);
                              }}
                            >
                              {option}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    location
                  </label>
                  <input
                    type="text"
                    id="zone"
                    className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="zone"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="shadow w-[300px] h-20 appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#29bfa7] hover:bg-teal-600 text-white font-bold rounded px-3 py-2 "
                >
                  Send Notice
                </button>
              </form>
            </div>
          </div>
        </div>
     
     
      </div>
      <button className="text-blue-500 mb-56" onClick={()=>{nav('/update-password')}}>Change Password</button>
    </div>
  );
}

export default OperationForm;
