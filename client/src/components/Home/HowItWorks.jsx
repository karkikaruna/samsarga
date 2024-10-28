import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import '../Css/HowItWorks.css';
const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How Our Job Board Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create an Account</p>
            <p>
              Sign up to access job postings, set up your profile, and start applying to
              jobs that match your skills and interests.
            </p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find a Job or Post a Job</p>
            <p>
              Browse job listings posted by companies or post job openings if you’re an
              employer seeking candidates.
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Apply for Jobs or Recruit Candidates</p>
            <p>
              Easily apply for jobs or manage candidate applications if you’re an
              employer to find the best fit for your role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;


// import React from "react";
// import { FaUserPlus } from "react-icons/fa";
// import { MdFindInPage } from "react-icons/md";
// import { IoMdSend } from "react-icons/io";

// const HowItWorks = () => {
//   return (
//     <>
//       <div className="howitworks">
//         <div className="container">
//           <h3>How JOb board Works</h3>
//           <div className="banner">
//             <div className="card">
//               <FaUserPlus />
//               <p>Create Account</p>
//               <p>
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//                 Consequuntur, culpa.
//               </p>
//             </div>
//             <div className="card">
//               <MdFindInPage />
//               <p>Find a Job/Post a Job</p>
//               <p>
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//                 Consequuntur, culpa.
//               </p>
//             </div>
//             <div className="card">
//               <IoMdSend />
//               <p>Apply For Job/Recruit Suitable Candidates</p>
//               <p>
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//                 Consequuntur, culpa.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HowItWorks;
