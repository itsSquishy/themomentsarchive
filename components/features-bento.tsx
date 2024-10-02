import { Card, CardHeader, Image } from "@nextui-org/react";

export default function FeaturesBento() {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            {/* Responsive Grid Layout */}
            <div className="grid h-[100vh] w-full gap-4 
                grid-cols-1 grid-rows-auto 
                sm:grid-cols-2 sm:grid-rows-3  
                md:grid-cols-3 md:grid-rows-6">


                {/* Card 1 */}
                <Card className="relative col-span-1 sm:col-span-2 md:col-span-2 md:row-span-3">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    <CardHeader className="absolute z-20 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Convenience</p>
                        <h4 className="text-white font-medium text-large">QR code</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="QR Code Convenience"
                        className="z-0 w-full h-full object-cover"
                        src="/qr-code-image.png"
                    />
                </Card>

                {/* Card 2 */}
                <Card className="relative col-span-1 md:row-span-4">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    <CardHeader className="absolute z-20 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Unlimited Guests</p>
                        <h4 className="text-white font-medium text-large">No guest limits</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Unlimited Guests"
                        className="z-0 w-full h-full object-cover"
                        src="/unlimited-guests.jpg"
                    />
                </Card>

                {/* Card 3 */}
                <Card className="relative col-span-1 md:row-span-3">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    <CardHeader className="absolute z-20 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Access</p>
                        <h4 className="text-white font-medium text-large">To view and download</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="6 Months Access"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-2.jpeg"
                    />
                </Card>

                {/* Card 4 */}
                <Card className="relative col-span-1 md:row-span-3">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    <CardHeader className="absolute z-20 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Mini QR Cards</p>
                        <h4 className="text-white font-medium text-large">Physical QR Cards</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Mini QR Cards"
                        className="z-0 w-full h-full object-cover"
                        src="/mini-qr.png"
                    />
                </Card>

                {/* Card 5 */}
                <Card className="relative col-span-1 md:row-span-2">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    <CardHeader className="absolute z-20 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Memories</p>
                        <h4 className="text-white font-medium text-large">Download & Share</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Download & Share"
                        className="z-0 w-full h-full object-cover"
                        src="/share.png"
                    />
                </Card>
            </div>

            <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-20" />
        </div>
    );
}
