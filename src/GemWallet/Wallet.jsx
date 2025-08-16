import React, { useState, useEffect } from "react";
import { isInstalled, getAddress, submitTransaction } from "@gemwallet/api";
import { toast } from "react-toastify";
import { RxCrossCircled } from "react-icons/rx";
export const Wallet = () => {
   const [walletAddress, setWalletAddress] = useState("");
   const [isConnected, setIsConnected] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [destination, setDestination] = useState("");
   const [amount, setAmount] = useState("");

   useEffect(() => {
      // Check localStorage for wallet data on component mount
      const savedAddress = localStorage.getItem("walletAddress");
      const savedIsConnected = localStorage.getItem("isConnected") === "true";

      if (savedAddress && savedIsConnected) {
         setWalletAddress(savedAddress);
         setIsConnected(true);
      }
   }, []);

   const handleConnect = async () => {
      const response = await isInstalled();
      if (response.result.isInstalled) {
         const addressResponse = await getAddress();
         if (addressResponse.result?.address) {
            setWalletAddress(addressResponse.result.address);
            setIsConnected(true);
            // save wallet address and connection in localStorage
            localStorage.setItem(
               "walletAddress",
               addressResponse.result.address
            );
            localStorage.setItem("isConnected", "true");
         }
      } else {
         toast("GemWallet is not installed.");
      }
   };

   const handleDisconnect = () => {
      setIsConnected(false);
      setWalletAddress("");
      setShowModal(false);
      // Clear wallet data from localStorage on disconnect
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("isConnected");
   };

   const toggleModal = () => {
      setShowModal(!showModal);
   };

   const handleSubmitTransaction = async () => {
      const transaction = {
         transaction: {
            TransactionType: "Payment",
            Destination: destination,
            Amount: amount,
            Memos: [
               {
                  Memo: {
                     MemoData: "54657374206D656D6F",
                     MemoType: "4465736372697074696F6E",
                  },
               },
            ],
         },
      };

      try {
         const response = await submitTransaction(transaction);
         if (response.result?.hash) {
            console.log(
               "Transaction submitted successfully. Hash:",
               response.result.hash
            );
            toast("Transaction submitted");
         } else {
            toast("Transaction failed. Please try again.");
         }
      } catch (error) {
         console.error("Error during transaction submission:", error);
         toast("An error occurred while submitting the transaction.");
      }
   };
   return (
      <>
         <div className="App">
            <button
               onClick={isConnected ? toggleModal : handleConnect}
               className="transform  bg-blue-500 px-6 py-2 font-semibold text-white transition duration-200 hover:scale-105 hover:bg-blue-600"
            >
               {isConnected ? "Connected" : "Connect Wallet"}
            </button>

            {showModal && (
               <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex w-full items-center justify-center bg-black bg-opacity-50">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                     <div className="flex items-start justify-between">
                        <h3 className="mb-4 text-[16px] font-[600]">
                           Wallet Info
                        </h3>
                        <button
                           onClick={toggleModal}
                           className="right-2 top-2 text-red-500"
                        >
                           <RxCrossCircled size={20} />
                        </button>
                     </div>
                     <p className="mb-4 text-[14px]">
                        Your wallet address: {walletAddress}
                     </p>
                     <div className="mb-4">
                        <label className="text-[12px] font-[500]">
                           Destination Address:
                        </label>
                        <input
                           type="text"
                           value={destination}
                           onChange={(e) => setDestination(e.target.value)}
                           className="mt-1 w-full rounded border px-2 py-3 text-[12px] font-[400] text-black"
                           placeholder="Enter destination address"
                        />
                     </div>

                     <div className="mb-4">
                        <label className="text-[12px] font-[500]">
                           Amount (1XRP =1000000 drops)
                        </label>
                        <input
                           type="number"
                           value={amount}
                           onChange={(e) => setAmount(e.target.value)}
                           className="mt-1 w-full rounded border px-2 py-3 text-[12px] font-[400] text-black"
                           placeholder="Enter amount in drops"
                        />
                     </div>
                     <div className="flex justify-between">
                        <button
                           onClick={handleDisconnect}
                           className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
                        >
                           Disconnect
                        </button>
                        <button
                           onClick={handleSubmitTransaction}
                           className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
                        >
                           Submit Transaction
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   );
};
