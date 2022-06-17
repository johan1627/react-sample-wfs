import React from "react";

interface TextListTileProps {
  header: string;
  label: string;
}

export default function TextListTile(props: TextListTileProps) {
  const { header, label } = props;
  return (
    <>
      <p className="mt-2 text-slate-400 font-medium text-xxs">{header}:</p>
      <p className="text-slate-600 text-sm">{label}</p>
    </>
  );
}
