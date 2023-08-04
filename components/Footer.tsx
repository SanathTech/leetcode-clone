function Footer() {
  return (
    <div className="flex w-full justify-center p-4 text-sm text-[#A6A7A8]">
      <div className="flex w-11/12 max-w-6xl border-t-[1px] pt-5 border-[#eee]">
        <div>Copyright © 2023 LeetCode</div>
        <div className="flex ml-auto space-x-3">
          <div>Help Center</div>
          <div>|</div>
          <div>Jobs</div>
          <div>|</div>
          <div>Bug Bounty</div>
          <div>|</div>
          <div>Students</div>
          <div>|</div>
          <div>Terms</div>
          <div>|</div>
          <div>Privacy Policy</div>
        </div>
        <div className="flex ml-4 items-center">
          <img
            className="h-4 mr-2"
            src="https://leetcode.com/static/images/region/us.svg"
            alt=""
          />
          <div>United States</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
