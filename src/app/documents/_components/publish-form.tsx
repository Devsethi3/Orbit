import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TbWorld } from "react-icons/tb";
import { FiCheck, FiCopy } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PublishForm = () => {

    const [isPublished, setIsPublished] = useState(false);
    const [copied, setIsCopied] = useState(false);
    const [publishedUrl, setPublishedUrl] = useState<string>("");

    const handlePublish = async () => {
        try {
            const response = await fetch('/api/documents/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'publishing' }),
            });

            if (!response.ok) {
                throw new Error('Failed to publish');
            }

            setIsPublished(true);
            console.log("Document published");
        } catch (error) {
            console.error("Error publishing document:", error);
        }
    };

    const handleUnpublish = () => {
        setIsPublished(false);
        console.log("Document unpublished");
    };

    const handleShare = () => {
        console.log("Document shared");
        // Implement share functionality here
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" className="mr-14 lg:mr-0">{isPublished ? "Published" : "Publish"}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 lg:m-2 m-0 shadow-xl">
                    <div className="flex items-center flex-col px-4 py-3">
                        <TbWorld size={30} className="opacity-80" />
                        <h3 className="text-xl font-bold text-center mt-2 opacity-80">
                            {isPublished ? "Manage publication" : "Publish this note"}
                        </h3>
                        <p className="text-sm text-center mt-1">
                            {isPublished
                                ? "Your note is live on the web"
                                : "Share your work with others"}
                        </p>
                        {isPublished ? (
                            <div className="w-full mt-4 space-y-2">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={`${window.location.origin}${publishedUrl}`}
                                        readOnly
                                        className="text-sm pr-12 bg-transparent border rounded-md"
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 hover:bg-secondary rounded-r-md flex items-center px-3 cursor-pointer"
                                        onClick={() => { }}
                                    >
                                        {copied ? (
                                            <FiCheck className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <FiCopy className="h-5 w-5 text-gray-500" />
                                        )}
                                    </div>
                                </div>
                                <Button
                                    variant="secondary"
                                    className="w-full mt-2"
                                    onClick={handleUnpublish}
                                >
                                    Unpublish
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={handlePublish} className="w-full mt-4">
                                Publish
                            </Button>
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default PublishForm