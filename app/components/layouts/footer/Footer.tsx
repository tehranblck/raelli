import React from "react";
import Image from "next/image";
import Logo from "../../../../public/logo_footer.png";

const Footer = () => {
  return (
    <footer className="dark:bg-[#121212]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-start flex-wrap space-y-6 lg:space-y-0 px-4 lg:px-0 py-10 justify-between max-w-[1280px] ">
          <div className="flex flex-col">
            <Image
              src={Logo}
              width={220}
              height={50}
              className="text-yellow-600 "
              alt="logo"
            />
            <p className="text-[#828282] text-sm max-w-sm ml-4">
              Ziyafət donların satışı və kirayəsi
            </p>
          </div>
          <div>
            <div className="flex flex-col space-y-2 ml-4">
              <h3 className="dark:text-[#fff] text-lg">Əlaqə</h3>
              <p className="text-[#828282] text-sm">
                Əlaqə nömrəsi:
              </p>
              <p className="text-[#828282] text-sm">
                Email:
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-2 ml-4">
              <h3 className="dark:text-[#fff] text-lg">Məhsullar</h3>
              <p className="text-[#828282] text-sm">Pubg Mobile UC</p>
              <p className="text-[#828282] text-sm">TikTok</p>
              <p className="text-[#828282] text-sm">Instagram</p>
              <p className="text-[#828282] text-sm">Mobil oyunlar</p>
              <p className="text-[#828282] text-sm">TV-əyləncə</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-2 ml-4">
              <h3 className="dark:text-[#fff] text-lg">Xidmətlər</h3>
              <p className="text-[#828282] text-sm">Epin</p>
              <p className="text-[#828282] text-sm">Rəqəmsal kodlar</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] dark:bg-black bg-gray-400"></div>
      <div className="text-[#828282] flex justify-center items-center py-4 dark:bg-[#181818]">
        <span>2024 © Bütün hüquqlar qorunur</span>
      </div>
    </footer>
  );
};

export default Footer;
