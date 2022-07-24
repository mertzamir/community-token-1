import { useWeb3Context } from "../utils/web3context";

export default function JoinCommuntiyModal({ clickedCommunity, closeModal }) {
  const { currentUser, handleDiscordName } = useWeb3Context();

  return (
    <div>
      <div
        id="join-community-modal"
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-[#cdadff]">
            <button
              onClick={() => closeModal(clickedCommunity)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="join-community-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <div className="py-4 px-6 text-center rounded-t border-b dark:border-gray-600">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Join {clickedCommunity.name}
              </h3>
            </div>

            <div className="p-6">
              <form
                // onSubmit={console.log("hello")}
                className="my-4 text-white text-center space-y-3"
              >
                <label className="text-lg text-[#23024d]">
                  {clickedCommunity.name}{" "}
                </label>
                <div className="text-sm text-[#23024d]">
                  {clickedCommunity.description}
                </div>
                <hr/>
                <div className="mt-8 text-[#23024d]">
                  <label>Wallet Address</label>
                </div>
                <div>
                  <input
                    className="bg-gray-200 text-[#23024d] rounded-full px-12 py-2 mb-4"
                    disabled={true}
                    value={currentUser}
                  />
                </div>
                <label className="text-[#23024d]">Discord Name</label>
                <div className="mb-8">
                  <input
                    onChange={handleDiscordName}
                    type="text"
                    required
                    className="rounded-full bg-white text-[#23024d] px-12 py-2 mb-4 "
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-16 font-bold py-4  bg-white rounded-full text-[#23024d] hover:bg-gray-100"
                  >
                    Join {clickedCommunity.name}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
