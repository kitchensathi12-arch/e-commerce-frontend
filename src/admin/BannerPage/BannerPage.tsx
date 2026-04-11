import { useState, useMemo } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Pencil, Trash2, Eye } from "lucide-react";
import type { IBannerDocumnt, ICreateBannerPayload } from "@kitchensathi12-arch/ecommerce-types";
import {
  getAllBanners,
  deleteBanner,
  updateBanner,
  createBanner,
} from "../../services/BannerServices";
import BannerModal from "./BannerModal";
import toast from "react-hot-toast";

const BannerPage = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editTarget, setEditTarget] =
    useState<IBannerDocumnt | null>(null);
  const [viewTarget, setViewTarget] =
    useState<IBannerDocumnt | null>(null);

  const [search, setSearch] = useState("");

  const limit = 8;

  /* ================= FETCH ================= */

  const { data, isLoading, isError } = useQuery({
    queryKey: ["banners", page],
    queryFn: () => getAllBanners(page, limit),
    placeholderData: (prev) => prev,
  });

  const banners: IBannerDocumnt[] = data?.result || [];
  const totalPages: number = data?.totalPages || 1;

  /* ================= DELETE ================= */

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBanner(id),

    onSuccess: () => {
      toast.success("Banner deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },

    onError: () => {
      toast.error("Failed to delete banner");
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this banner?")) {
      deleteMutation.mutate(id);
    }
  };

  /* ================= TOGGLE STATUS ================= */

  const toggleStatusMutation = useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: string;
      isActive: boolean;
    }) => updateBanner(id, { isActive }),

    onSuccess: (_, variables) => {
      toast.success(
        variables.isActive
          ? "Banner activated"
          : "Banner deactivated"
      );

      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },

    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const handleToggleStatus = (banner: IBannerDocumnt) => {
    toggleStatusMutation.mutate({
      id: banner._id.toString(),
      isActive: !banner.isActive,
    });
  };

  /* ================= EDIT ================= */

  const handleEdit = (banner: IBannerDocumnt) => {
    setEditTarget(banner);
    setOpenModal(true);
  };

  /* ================= SUBMIT ================= */

  const saveMutation = useMutation({
    mutationFn: async (
      data:
        | (Omit<ICreateBannerPayload, "image"> & { image?: File })
        | (Partial<Omit<ICreateBannerPayload, "image">> & {
          image?: string | File;
        })
    ) => {
      if (editTarget) {
        return updateBanner(
          editTarget._id.toString(),
          data as Partial<Omit<ICreateBannerPayload, "image">> & {
            image?: string | File;
          }
        );
      } else {
        return createBanner(
          data as Omit<ICreateBannerPayload, "image"> & {
            image?: File;
          }
        );
      }
    },

    onSuccess: () => {
      toast.success(
        editTarget
          ? "Banner updated successfully"
          : "Banner created successfully"
      );

      queryClient.invalidateQueries({ queryKey: ["banners"] });
      setOpenModal(false);
      setEditTarget(null);
    },

    onError: () => {
      toast.error(
        editTarget
          ? "Failed to update banner"
          : "Failed to create banner"
      );
    },
  });

  const handleSubmit = (
    formData:
      | (Omit<ICreateBannerPayload, "image"> & { image?: File })
      | (Partial<Omit<ICreateBannerPayload, "image">> & {
        image?: string | File;
      })
  ) => {
    saveMutation.mutate(formData);
  };

  /* ================= SEARCH ================= */

  const filteredBanners = useMemo(() => {
    return banners.filter((banner) =>
      banner.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [banners, search]);

  /* ================= UI ================= */

  const renderValue = (
    value: string | number | boolean | null | undefined
  ) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return value;
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Banner Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage promotional banners
          </p>
        </div>

        <button
          onClick={() => {
            setEditTarget(null);
            setOpenModal(true);
          }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl 
          hover:bg-indigo-700 transition shadow-md w-full sm:w-auto"
        >
          Add Banner
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search banner..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 rounded-xl bg-white shadow-sm 
          focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="text-center py-20 text-gray-500">
          Loading banners...
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="text-center py-20 text-red-500">
          Something went wrong.
        </div>
      )}

      {/* GRID */}
      {!isLoading && !isError && (
        <>
          {filteredBanners.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              No banners found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBanners.map((banner) => (
                <div
                  key={banner._id.toString()}
                  className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <div className="relative h-52">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-4 right-4 flex gap-3 
  opacity-100 md:opacity-0 md:group-hover:opacity-100 
  transition">

                      <button
                        onClick={() => setViewTarget(banner)}
                        className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleEdit(banner)}
                        className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(banner._id.toString())
                        }
                        className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="font-semibold text-lg text-gray-800 truncate">
                      {banner.title}
                    </h2>

                    <div className="flex justify-between items-center mt-3 text-sm">

                      <div className="flex items-center gap-3">

                        <label className="relative inline-flex items-center cursor-pointer">

                          <input
                            type="checkbox"
                            checked={banner.isActive}
                            onChange={() => handleToggleStatus(banner)}
                            className="sr-only peer"
                          />

                          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>

                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition peer-checked:translate-x-5"></div>

                        </label>

                        <span className="font-medium">
                          {banner.isActive ? "Active" : "Inactive"}
                        </span>

                      </div>

                      <span className="text-gray-400">
                        #{banner.priority}
                      </span>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-6 mt-14">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-5 py-2 bg-white rounded-lg shadow disabled:opacity-40"
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-5 py-2 bg-white rounded-lg shadow disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* EDIT / CREATE MODAL */}
      {openModal && (
        <BannerModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setEditTarget(null);
            queryClient.invalidateQueries({
              queryKey: ["banners"],
            });
          }}
          editTarget={editTarget}
          isPending={saveMutation.isPending} // ✅ Pass isPending so button shows Creating.../Updating...
          onSubmit={handleSubmit}
        />
      )}

      {/* VIEW MODAL */}
      {viewTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start sm:items-center justify-center p-4">

            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl my-8">

              {/* IMAGE */}
              <div className="h-56 sm:h-64 w-full">
                <img
                  src={viewTarget.image}
                  alt={viewTarget.title}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-6">

                <h2 className="text-2xl font-bold">
                  {renderValue(viewTarget.title)}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">

                  <Info label="Subtitle" value={viewTarget.subtitle} />
                  <Info label="Button Text" value={viewTarget.buttonText} />
                  <Info label="Redirect URL" value={viewTarget.redirectUrl} />
                  <Info label="Type" value={viewTarget.type} />
                  <Info label="Priority" value={viewTarget.priority} />
                  <Info label="Status" value={viewTarget.isActive ? "Active" : "Inactive"} />
                  <Info
                    label="Start Date"
                    value={
                      viewTarget.startDate
                        ? new Date(viewTarget.startDate).toLocaleDateString()
                        : ""
                    }
                  />
                  <Info
                    label="End Date"
                    value={
                      viewTarget.endDate
                        ? new Date(viewTarget.endDate).toLocaleDateString()
                        : ""
                    }
                  />

                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setViewTarget(null)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default BannerPage;

/* -------- Info Component -------- */

const Info = ({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">
      {value === null || value === undefined || value === ""
        ? "-"
        : String(value)}
    </p>
  </div>
);