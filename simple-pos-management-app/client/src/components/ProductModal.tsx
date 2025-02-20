import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Product, ProductCreate } from "../types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, createCategory } from "../service/category";
import { useState } from "react";
import { AxiosError } from "axios";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: ProductCreate) => void;
  product: Product | null;
}

export function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
}: ProductModalProps) {
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const productData: ProductCreate = {
      name: formData.get("name") as string,
      sku: formData.get("sku") as string,
      price: Number(formData.get("price")),
      stock_quantity: Number(formData.get("stock_quantity")),
      description: (formData.get("description") as string) || undefined,
      category_id: Number(formData.get("category")),
      status: Boolean(formData.get("status")),
    };

    onSubmit(productData);
  };

  const handleNewCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("categoryName") as string;

    try {
      await createCategory({ name, status: true });
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsNewCategoryDialogOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Failed to create category:", error);
        alert(error.response?.data?.detail || "Failed to create category");
      }
    }
  };

  return (
    <section>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-xl rounded-xl bg-white p-8 w-full shadow-2xl">
            <DialogTitle className="text-2xl font-semibold mb-6 text-gray-900">
              {product ? "Edit Product" : "Add New Product"}
            </DialogTitle>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={product?.name}
                    required
                    className="block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sku"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    id="sku"
                    defaultValue={product?.sku}
                    required
                    className="block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      defaultValue={product?.price}
                      required
                      min="0"
                      step="0.01"
                      className="block w-full rounded-lg border-gray-200 bg-gray-50 pl-8 pr-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="stock_quantity"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock_quantity"
                    id="stock_quantity"
                    defaultValue={product?.stock_quantity}
                    required
                    min="0"
                    className="block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    defaultValue={product?.description}
                    rows={3}
                    className="block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="category"
                      id="category"
                      defaultValue={product?.category?.id}
                      required
                      className="block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select a category</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setIsNewCategoryDialogOpen(true)}
                      className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                    >
                      New
                    </button>
                  </div>
                  {isLoading && (
                    <p className="mt-1 text-sm text-gray-500">
                      Loading categories...
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="status"
                      id="status"
                      defaultChecked={product?.status}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-semibold text-gray-700">
                      Active Status
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={isNewCategoryDialogOpen}
        onClose={() => setIsNewCategoryDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-sm rounded-xl bg-white p-6 w-full shadow-2xl">
            <DialogTitle className="text-xl font-semibold mb-4 text-gray-900">
              Create New Category
            </DialogTitle>
            <form onSubmit={handleNewCategory} className="space-y-4">
              <div>
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  id="categoryName"
                  required
                  className="block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsNewCategoryDialogOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
}
