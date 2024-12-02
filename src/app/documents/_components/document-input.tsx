import { BsCloudCheck } from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRef, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const [value, setValue] = useState(title);

  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({ id, title: newValue })
      .then(() => toast.success("Document updated"))
      .catch(() => toast.error("Failed to update document!"))
      .finally(() => setIsPending(false));
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast.success("Document updated");
        setIsEditing(false);
      })
      .catch(() => toast.error("Failed to update document!"))
      .finally(() => setIsPending(false));
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <form
            action=""
            className="relative w-fit max-w-[50ch]"
            onSubmit={handleSubmit}
          >
            <span className="invisible whitespace-pre px-1.5 text-lg">
              {value || ""}
            </span>
            <input
              type="text"
              ref={inputRef}
              value={value}
              onChange={onChange}
              onBlur={() => setIsEditing(false)}
              className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
            />
          </form>
        ) : (
          <span
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
            className="text-lg px-1.5 cursor-pointer truncate"
          >
            {title ? title : "Untitled Document"}
          </span>
        )}
        <BsCloudCheck className="w-4 h-4" />
      </div>
    </>
  );
};

export default DocumentInput;
