import { FiChevronDown } from "react-icons/fi";
import styled from "styled-components";

interface ChevronButtonProps {
  isExpand: boolean;
  onclick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ChevronButton: React.FC<ChevronButtonProps> = ({
  isExpand,
  onclick,
}: ChevronButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onclick(event);
  };

  return (
    <Button onClick={handleClick}>
      <FiChevronDown
        color="#FFF"
        size="1rem"
        style={{ transform: !isExpand ? `rotate(-90deg)` : `rotate(0deg)` }}
      ></FiChevronDown>
    </Button>
  );
};

const Button = styled.button`
  background: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
`;
