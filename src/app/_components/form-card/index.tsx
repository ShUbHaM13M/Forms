import { Card } from "antd";
import Image from "next/image";

interface FormCardProps {
  title: string;
  description: string;
}

const FormCard = ({ title, description }: FormCardProps) => {
  return (
    <Card
      hoverable
      style={{ width: 200 }}
      cover={
        <Image
          src="https://placehold.co/200x140/orange/white"
          alt="placeholeimgr"
          width="200"
          height="140"
        />
      }
    >
      <Card.Meta title={title} description={description} />
    </Card>
  );
};

export default FormCard;
