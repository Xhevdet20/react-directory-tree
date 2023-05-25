"use client"; 
import { useState } from "react";
import styles from "./../styles/Home.module.scss";

let directory: ItemType[] = [
  {
    name: "node_modules",
    children: [
      {
        name: "axios",
        children: [
          {
            name: "package.json",
          },
          {
            name: "node_modules",
          },
        ],
      },
      {
        name: "schmuck",
      },
    ],
  },
  {
    name: "package.json",
  },
  {
    name: "tsconfig.json",
  },
];

interface ItemType {
  name: string;
  children?: ItemType[];
}

interface Props {
  unit: ItemType;
  depth: number;
}

const Item: React.FC<Props> = ({ unit, depth }) => {
  const [toggle, setToggle]= useState<boolean>(false);

  return (
    <div>
      {unit.children ? (<div style={{cursor: "pointer"}} onClick={() => setToggle(!toggle)}>{toggle ? "- " : "+" } {unit.name}</div>) : (<div >{unit.name}</div>)}
      {toggle && <div style={{ paddingLeft: `${depth * 10}px` }} >
        {unit.children?.map((child) => (
          <Item unit={child}  depth={depth + 1} />
        ))}
      </div>}
    </div>
  );
};

export default function Home() {
  return (
    <div className={styles.home} >
      {directory.map((unit) => (
        <Item unit={unit} depth={1} />
      ))}
    </div>
  );
}
