import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import { postcategories, postTags } from "@/constants";

// import {
//   useCreateUserAccount,
//   useSignInAccount,
// } from "@/lib/react-query/queries";

import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/supabase-queries";

import { addUserTags } from "@/lib/supabase/api/tags";

import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { IUser } from "@/types";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const [activeTags, setActiveTags] = React.useState<string[]>([]);
  const [tags, setTags] = React.useState<{ value: string; label: string }[]>(
    []
  );

  // Queries
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } =
    useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = (await createUserAccount(user)) as IUser[];

      const userID = newUser[0].id;

      console.log(userID, "new user");
      console.log(activeTags, "active tags");

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again." });

        return;
      }

      // const session = await signInAccount({
      //   email: user.email,
      //   password: user.password,
      // });

      // if (!session) {
      //   toast({ title: "Something went wrong. Please login your new account" });

      //   navigate("/sign-in");

      //   return;
      // }

      // add tags to user
      await addUserTags(activeTags, userID);

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const addTag = async (tag: any) => {
    // add tag to active tags if it doesn't exist in the array or remove it if it does
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((item) => item !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  React.useEffect(() => {
    const fetchTags = async () => {
      const tags = await postTags();
      setTags(tags);
    };
    fetchTags();
  }, []);

  React.useEffect(() => {
    console.log(activeTags);
  }, [activeTags]);

  return (
    <div className="mt-20">
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Create a new account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            To use Avocado Finance, Please enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* tags */}
            <div>
              <p>Tags</p>
              <div className="tags_wrap">
                {tags?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p
                        onClick={() => addTag(item.value)}
                        className={`tags ${
                          activeTags.includes(item.value) &&
                          "bg-[#64D25F] text-[#000]"
                        } `}>
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>{" "}
            </div>

            <Button type="submit" className="shad-button_primary">
              {isCreatingAccount || isSigningInUser || isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link
                to="/sign-in"
                className="text-primary-500 text-small-semibold ml-1">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
