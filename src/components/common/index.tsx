import moment from 'moment';
import { notification, Typography } from 'antd';
import { getPreSignedUrl } from '../File/service';

const { Text } = Typography;
export const G_NAME = "Go Pathshala";

export const G_DATE_FORMAT = 'DD/MM/YYYY';
export const G_DATE_READABLE_FORMAT = 'DD MMM, YYYY';

export const getMomentFromDate = (input: string, format = G_DATE_FORMAT) => {
  return moment(input, format);
};

export const getDateFromMoment = (input: any, format = G_DATE_FORMAT) => {
  return moment(input).format(format);
};

export const getReadableDateFormat = (
  input: any,
  inputFormat = G_DATE_FORMAT,
  outputFormat = G_DATE_READABLE_FORMAT,
) => {
  return moment(input, inputFormat).format(outputFormat);
};

export const getTimestampToRelativeFormat = (input: any) => {
  return moment(input).fromNow();
};

export const CustomDrawerWidth =
  window.innerWidth > 992 ? '50%' : window.innerWidth > 768 ? '65%' : '80%';

export const EmailIdPreview = (props: any) => {
  const { email } = props;

  if (!email) return <></>;

  return (
    <Text copyable={{text: email}} >
      <a href={`mailto:${email}`}>
        {email}
      </a>
    </Text>
  );
}

export const ContactNumberPreview = (props: any) => {
  const { contactNumber } = props;

  if (!contactNumber) return <></>;

  return (
    <Text copyable={{text: contactNumber}} >
      <a href={`tel:${contactNumber}`}>
        {contactNumber}
      </a>
    </Text>
  );
}

export const UserTypePreview = (props: any) => {
  const { userType } = props;

  if (!userType) return <></>;
  
  const G_USERTYPE_LABEL = {
    "sa": "Super admin",
    "ad": "Admin",
    "st": "Staff",
    "stu": "Student",
  }

  return G_USERTYPE_LABEL[userType];
}

export const getUrl = async (_id: string) => {
  const { status, class: className, message, payload: imgPayload } = await getPreSignedUrl({
    _id: _id,
  });
  if (!status) {
    notification[className]({
      message: message,
    });
    return;
  }
  
  return imgPayload;
};
