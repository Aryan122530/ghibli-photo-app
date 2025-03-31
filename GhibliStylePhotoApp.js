import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { image_gen } from "@/lib/image_gen";

export default function GhibliStylePhotoApp() {
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImages = async () => {
    setLoading(true);
    try {
      const generatedImages = await image_gen.text2im({
        prompt: "Ghibli style fantasy landscape with warm lighting and rich colors",
        size: "1024x1024",
        n: count,
      });
      setImages(generatedImages.map(img => img.url));
    } catch (error) {
      console.error("Image generation failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold">Ghibli Style Photo Generator</h1>
      <Input
        type="number"
        min="1"
        max="10"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        placeholder="Enter number of images"
        className="text-center"
      />
      <Button onClick={generateImages} disabled={loading} className="w-full">
        {loading ? "Generating..." : "Generate Images"}
      </Button>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {images.map((img, index) => (
          <Card key={index}>
            <CardContent>
              <img src={img} alt={`Ghibli Style ${index + 1}`} className="rounded-lg w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
          }
