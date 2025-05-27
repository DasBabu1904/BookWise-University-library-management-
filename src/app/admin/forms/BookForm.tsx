"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./../../../../styles/admin.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "@/components/admin/ColorPicker";
import createBook from "@/lib/admin/actions/books";
import { toast } from "sonner";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genere: "",
      description: "",
      rating: 0,
      totalCopies: 0,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values);
    if (result.success) {
      alert("Book added successfully !!!");
      router.push(`/admin/books/${result.data.id}`);
    } else {
      alert("failed to create the book");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Book Title
                </FormLabel>
                <FormControl className="">
                  <Input
                    required
                    placeholder="Book title"
                    {...field}
                    className="book-form_input bg-gray-200 placeholder:text-gray-600"
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />
          {/* -----------------------------------------author--------------------------------------------------- */}
          <FormField
            control={form.control}
            name={"author"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Author
                </FormLabel>
                <FormControl className="">
                  <Input
                    required
                    placeholder=" Author"
                    {...field}
                    className="book-form_input bg-gray-200 placeholder:text-gray-600"
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />
          {/* -----------------------------------------genere--------------------------------------------------- */}
          <FormField
            control={form.control}
            name={"genere"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Genere
                </FormLabel>
                <FormControl className="">
                  <Input
                    required
                    placeholder="Book genere"
                    {...field}
                    className="book-form_input bg-gray-200 placeholder:text-gray-600"
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />
          {/* -----------------------------------------Rating--------------------------------------------------- */}
          <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Book Rating
                </FormLabel>
                <FormControl className="">
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    placeholder="Book Rating"
                    {...field}
                    className="book-form_input bg-gray-200 placeholder:text-gray-600"
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />
          {/* -----------------------------------------totalCopies--------------------------------------------------- */}
          <FormField
            control={form.control}
            name={"totalCopies"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Total Copies
                </FormLabel>
                <FormControl className="">
                  <Input
                    type="number"
                    min={0}
                    max={10000}
                    placeholder="Total copies"
                    {...field}
                    className="book-form_input bg-gray-200 placeholder:text-gray-600"
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* ----------------------------------------coverUrl---------------------------------------------------- */}
          <FormField
            control={form.control}
            name={"coverUrl"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Book Image
                </FormLabel>
                <FormControl className="">
                  <FileUpload
                    type="image"
                    accept="image/*"
                    placeholder="Upload a Book Cover"
                    folder="books/cover"
                    variant="light"
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />
          {/* --------------------------------------------coverColor------------------------------------------------ */}
          <FormField
            control={form.control}
            name={"coverColor"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Cover Color
                </FormLabel>
                <FormControl className="">
                  <ColorPicker
                    onPickerChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />
          {/* -----------------------------------------Description--------------------------------------------------- */}
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Book Description
                </FormLabel>
                <FormControl className="">
                  <Textarea
                    placeholder="Book Description"
                    {...field}
                    rows={10}
                    className="book-form_input"
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />
          {/* ---------------------------------------------videoUrl-------------------------------------------------------------- */}
          <FormField
            control={form.control}
            name={"videoUrl"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Book Video
                </FormLabel>
                <FormControl className="">
                  <FileUpload
                    type="video"
                    accept="video/*"
                    placeholder="Upload a Book Review Video"
                    folder="books/videos"
                    variant="light"
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* -----------------------------------------Book Summary--------------------------------------------------- */}
          <FormField
            control={form.control}
            name={"summary"}
            render={({ field }) => (
              <FormItem className="mt-3  flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-gray-700">
                  Book Summary
                </FormLabel>
                <FormControl className="">
                  <Textarea
                    placeholder="Book Summary"
                    {...field}
                    rows={5}
                    className="book-form_input"
                  />
                </FormControl>
                {/* <FormDescription>
                   This can be used for field description but we dont need this one in this project 
                  </FormDescription> */}

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="book-form_btn  font-semibold bg-blue-950 hover:bg-slate-900 mt-5"
          >
            Add to Library
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
