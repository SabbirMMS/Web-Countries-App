/* eslint-disable react/prop-types */
import Clock from "./Clock";

const Navbar = ({ searchTerm, handleSearchChange, handleSortChange }) => {
  return (
    <>
      <div className="fixed top-0 navbar bg-base-200 z-10">
        <div className="flex-1 gap-1">
          <img
            className="h-10"
            src="https://png.pngtree.com/png-vector/20230901/ourmid/pngtree-the-earth-logo-in-color-line-design-vector-png-image_7017998.png"
            alt="Logo"
          />
          <a className="btn btn-ghost text-2xl text-primary uppercase hover:text-red-400">
            Country App
          </a>
          <Clock />
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://cdn-icons-png.flaticon.com/512/306/306422.png"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <span className=" text-lg font-bold m-2">Sort By</span>
              <li onClick={() => handleSortChange(0)}>
                <a className="justify-between">
                  Country A → Z
                  {/* <span className="badge">sort by</span> */}
                </a>
              </li>
              <li onClick={() => handleSortChange(1)}>
                <a>Country Z → A</a>
              </li>
              <li onClick={() => handleSortChange(2)}>
                <a>Population 0 → 9</a>
              </li>
              <li onClick={() => handleSortChange(3)}>
                <button>Population 9 → 0</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
