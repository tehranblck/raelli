"use client";
import React, { useEffect, useState } from "react";
import InformationBar from "../../shared/InformationBar";
import { CategoryType } from "@/app/models/ui/categoryType";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

const FilteredProductsComponent = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://e-commerce.saytyarat.com/api/products/type/?page_size=20");
        if (!res.ok) {
          throw new Error("Kategorileri yükləmək mümkün olmadı");
        }
        const data = await res.json();

        if (data.results) {
          const categoriesData = data.results.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image || "/assets/images/categories/default.png",
            hasSubTypes: item.sub_types && item.sub_types.length > 0,
          }));
          setCategories(categoriesData);
        } else {
          throw new Error("Kateqoriya məlumatları düzgün formatda deyil");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError((error as Error).message);
        toast.error("Kateqoriyaları yükləmək mümkün olmadı", {
          position: "top-right"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-red-500">
        {error}
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-gray-500">
        Kateqoriyalar tapılmadı
      </div>
    );
  }

  const isCategoriesPage = pathname === "/categories";
  const displayedCategories = isCategoriesPage
    ? categories
    : showAll
      ? categories
      : categories.slice(0, 10);

  return (
    <section className="dark:bg-[#121212] py-3">
      <div className="max-w-[600px] md:max-w-[1280px] mx-auto">
        <div className="px-2">
          <InformationBar link="/categories" HasButton={false} title=" Kateqoriyalar" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-12 mt-6 px-2 justify-center">
          {displayedCategories.map((category) => (
            <Link
              href={
                category.hasSubTypes
                  ? `/categories/${category.name}/sub`
                  : `/categories/${category.name}`
              }
              key={category.id}
              className="dark:bg-[#1f1f1f] overflow-hidden dark:border-0 border-2 px-8 w-full hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(75,0,130,0.6)] duration-300 transition-all ease-in-out cursor-pointer h-[150px] rounded-md flex items-center justify-center"
            >
              <Image
                width={5070}
                height={5000}
                quality={100}
                src={category.image}
                alt={category.name}
                className="w-full h-auto object-cover"
              />
            </Link>
          ))}
        </div>

        {!isCategoriesPage && categories.length > 10 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="relative transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white"
            >
              {showAll ? "Daha az göstər" : "Daha çox göstər"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilteredProductsComponent;
