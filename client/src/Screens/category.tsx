import React from "react";
import "../misc/category.css"; // ไฟล์ CSS สำหรับสไตล์

// ข้อมูลหมวดหมู่
const categories = [
  { name: "ทั้งหมด", color: "#9b9b9b" },
  { name: "วิชาเสรี", color: "#f5a623" },
  { name: "ข่าวประชาสัมพันธ์", color: "#4a90e2" },
  { name: "น้องใหม่", color: "#7ed321" },
  { name: "ลงทะเบียนเรียน", color: "#50e3c2" },
  { name: "กีฬา", color: "#bd10e0" },
  { name: "ทั่วไป", color: "#9013fe" },
  { name: "รีวิว", color: "#d0021b" },
];

const CategoryCard: React.FC<{
  name: string;
  color: string;
}> = ({ name, color }) => {
  return (
    <div className="cat">
      <div className="category-card" style={{ borderColor: color }}>
        <div className="category-info">
          <h3>{name}</h3>
          {/* เอาจำนวน threads ออก */}
        </div>
      </div>
    </div>
  );
};

const Category: React.FC = () => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          color={category.color}
        />
      ))}
    </div>
  );
};

export default Category;
