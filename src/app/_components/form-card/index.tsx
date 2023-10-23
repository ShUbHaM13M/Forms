import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";

interface FormCardProps {
  title: string;
  description: string;
  id: string;
}

const FormCard = ({ title, description, id }: FormCardProps) => {
  return (
    <Link href={`form/${id}`}>
      <Card
        hoverable
        cover={
          <Image
            style={{ maxWidth: "100%", objectFit: "cover" }}
            src="https://placehold.co/200x140/orange/white"
            alt="placeholeimgr"
            width="200"
            height="140"
          />
        }
      >
        <Card.Meta title={title} description={description} />
      </Card>
    </Link>
  );
};

export default FormCard;
