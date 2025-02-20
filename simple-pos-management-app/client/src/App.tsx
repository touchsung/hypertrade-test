import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { ProductTable } from "./components/ProductTable";
import { Pagination } from "./components/Pagination";
import {
  Product,
  ProductCreate,
  ProductPaginationResponse,
} from "./types/product";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./service/product";
import { ProductModal } from "./components/ProductModal";
import { FiPlus } from "react-icons/fi";

function App() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery<ProductPaginationResponse>({
    queryKey: ["products", page],
    queryFn: async () => getProducts(page, limit),
  });

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (id: number) => {
    const productToEdit = products?.items.find((p) => p.id === id);
    setSelectedProduct(productToEdit ?? null);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleModalSubmit = async (productData: ProductCreate) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      refetch();
      handleModalClose();
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="container mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Header
            title="Products"
            description="Manage your product inventory"
          />
          <button
            onClick={handleAddProduct}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            <FiPlus className="h-5 w-5" />
            Add Product
          </button>
        </div>
        <Pagination
          currentPage={page}
          totalPages={products?.total_pages ?? 1}
          onPageChange={setPage}
        />
        <ProductTable
          products={products?.items ?? []}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        <ProductModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          product={selectedProduct}
        />
      </section>
    </div>
  );
}

export default App;
