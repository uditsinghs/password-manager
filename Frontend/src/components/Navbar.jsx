
function Navbar() {
  return (
    <div className="flex justify-around w-full h-[70px] bg-purple-300 ">

      <div className="p-5 text-[30px] font-bold ">
        <span className="text-green-700">&lt;</span>
        Password
        <span className="text-green-700"> OP/&gt;</span>
      </div>
      <div className="flex pt-6 items-center">
        <h1 className="text-green-600 font-bold   text-2xl">Created By: Udit singh    </h1>
        <lord-icon
          src="https://cdn.lordicon.com/xzalkbkz.json"
          trigger="hover"
          stroke="bold"
          colors="primary:#121331,secondary:#16c72e"
          >
        </lord-icon>
      </div>
    </div>
  )
}

export default Navbar