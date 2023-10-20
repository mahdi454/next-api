"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export default function App() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, message } = data;
    const res = await fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });
    const result = await res.json();
    console.log(result);
    router.push(`/tnx/`);
  };

  return (
    <div className="bg-[url(/image/bg-kho.jpg)] w-full h-screen">
      <div className="bg-gradient-to-r from-cyan-900 to-blue-900 w-[450px] mx-auto rounded-md p-5 flex justify-center flex-col items-center translate-y-20">
        <h1 className="text-2xl font-bold mb-10 mt-10">Feedback</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <div className="relative z-0 w-full mb-6 group ">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Your name
            </label>
            <input
              className=" w-72 outline-none px-3 py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
              type="text"
              id="name"
              {...register("name", { required: true })}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                <span className="font-medium">Oh, snapp!</span> This field
                required.
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="w-72 outline-none px-3 py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                <span className="font-medium">Oh, snapp!</span> This field
                required.
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-12 group">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Your message
            </label>
            <textarea
              {...register("message")}
              rows={4}
              id="message"
              className="block px-3 py-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="flex justify-around relative z-0 w-full mb-16 group">
            <button
              className="outline-none bg-gradient-to-r from-cyan-800 hover:from-cyan-700 hover:to-blue-700 to-blue-800 px-6 py-2 rounded-lg "
              type="reset"
            >
              Cancel
            </button>
            <button
              className="outline-none bg-gradient-to-r from-cyan-800 hover:from-cyan-700 hover:to-blue-700 to-blue-800 px-6 py-2 rounded-lg  "
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
