function Navbar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full h-auto bg-purple-300 p-4 md:p-6 lg:px-10">
      {/* Logo Section */}
      <div className="text-center md:text-left text-[24px] md:text-[32px] lg:text-[40px] font-bold">
        <span className="text-green-700">&lt;</span>
        Password
        <span className="text-green-700"> OP/&gt;</span>
      </div>

      {/* Creator Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center pt-4 md:pt-0 space-x-2">
        <h1 className="text-green-600 font-bold text-lg md:text-2xl lg:text-3xl text-center">
          Created By: Udit Singh
        </h1>
        <lord-icon
          src="https://cdn.lordicon.com/xzalkbkz.json"
          trigger="hover"
          stroke="bold"
          colors="primary:#121331,secondary:#16c72e"
          style={{ width: "40px", height: "40px" }}
        ></lord-icon>
      </div>
    </div>
  );
}

export default Navbar;
