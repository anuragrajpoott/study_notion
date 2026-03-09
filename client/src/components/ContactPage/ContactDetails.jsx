
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";
import * as HiIcons from "react-icons/hi2";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
      {contactDetails.map((item) => {
        const Icon =
          BiIcons[item.icon] || IoIcons[item.icon] || HiIcons[item.icon];

        return (
          <div
            key={item.heading}
            className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
          >
            <div className="flex items-center gap-3">
              {Icon && <Icon size={25} />}
              <h1 className="text-lg font-semibold text-richblack-5">
                {item.heading}
              </h1>
            </div>

            <p className="font-medium">{item.description}</p>
            <p className="font-semibold">{item.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;

