"use client"

import { useRouter } from "next/navigation";
import React from "react";

const EditPage = ({ params }: { params: {id: string}}) => {
  const router = useRouter();
  const id = params.id;
  return <div>edit {id}</div>;
};

export default EditPage;
