import React from "react";

import Pricing from "../components/Plans/Pricing";
import CheckCircleSVG from "../components/SVG/CheckCircleSVG";
import { LuLock, LuShieldCheck, LuUnlink } from "react-icons/lu";


const PricingPage = () => {
    return (
        <div className="block text-[#ccc]">
            <div className="pricing-title flex items-center flex-col text-center padding-clamp-pricing">
                <h1 className="text-[3rem] font-bold">Select your plan</h1>
            </div>

            <div className="pricing-plan p-6 flex flex-col items-center justify-center">
                <Pricing />

                <p className="my-2">*Free users have a max allowance of 3 downloads, topped up by 1 each month.</p>
                <p>**Micro organizations are classified as having 5 employees or less.</p>
            </div>

            <div className="pricing-payments padding-clamp-payments">
                <div className="payments-pill flex flex-wrap items-center justify-center gap-4 px-[3rem]">
                    <div className="text-[#cdd2d1] flex items-center text-[0.8rem]">
                        <CheckCircleSVG />
                        <div className="flex-1 text-center px-2">Safe for monetization</div>
                    </div>
                    <div className="text-[#cdd2d1] flex items-center text-[0.8rem]">
                        <CheckCircleSVG />
                        <div className="flex-1 text-center px-2">New music added daily</div>
                    </div>
                    <div className="text-[#cdd2d1] flex items-center text-[0.8rem]">
                        <CheckCircleSVG />
                        <div className="flex-1 text-center px-2">Copyright-free</div>
                    </div>
                </div>

                <div className="payments-info flex justify-center p-8">
                    <div
                        className="payment-info-section border-r border-[#4e5152]
                    flex flex-col justify-start px-8 max-w-[20rem]"
                    >
                        <div className="payment-info-header flex items-center font-medium mb-2 text-[0.825rem] gap-2 text-[#A1A8AA]">
                            <LuShieldCheck size={20} />
                            <span>Payment Methods</span>
                        </div>
                        <div className="payment-info-body flex gap-1 text-[0.8rem]">
                            <img className="max-w-12 max-h-8 mt-1" src="/visa.png" />
                            <img className="max-w-12 max-h-8 mt-1" src="/mastercard.png" />
                            <img className="max-w-12 max-h-8 mt-1" src="/amex.png" />
                        </div>
                    </div>

                    <div
                        className="payment-info-section border-r border-[#4e5152]
                    flex flex-col justify-start px-8 max-w-[20rem]"
                    >
                        <div className="payment-info-header flex items-center font-medium mb-2 text-[0.825rem] gap-2 text-[#A1A8AA]">
                            <LuUnlink size={19} />
                            <span>Cancel Anytime</span>
                        </div>
                        <div className="payment-info-body flex gap-1 text-[0.7rem] text-[#A1A8AA]">
                            <p>No tie-ins, just simple plans which you can cancel at any time.</p>
                        </div>
                    </div>

                    <div
                        className="payment-info-section]
                    flex flex-col justify-start px-8 max-w-[20rem]"
                    >
                        <div className="payment-info-header flex items-center font-medium mb-2 text-[0.825rem] gap-2 text-[#A1A8AA]">
                            <LuLock size={19} />
                            <span>Secure Payment</span>
                        </div>
                        <div className="payment-info-body flex gap-1 text-[0.7rem] text-[#A1A8AA]">
                            <p>Transactions are encrypted and secured.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;