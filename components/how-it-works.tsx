import { TutorialStep } from "./tutorial/tutorial-step";

export default function HowItWorks() {
  return (
    <ol className="flex flex-col gap-6 px-4">
      <TutorialStep step="Step 1" title="Scan the QR code">
        <p>
          Start by scanning the QR code provided at the event using your smartphone.
        </p>
      </TutorialStep>

      <TutorialStep step="Step 2" title="Upload Photos and Videos">
        <p>
          After scanning, you'll be redirected to the event page where you can easily upload photos and videos of the event.
        </p>
      </TutorialStep>

      <TutorialStep step="Step 3" title="Share Your Memories">
        <p>
          Once uploaded, your memories are instantly shared with everyone at the event, 
          making it easy to relive the moments together.
        </p>
      </TutorialStep>

      <TutorialStep step="Step 4" title="View or Download to keep">
        <p>
          During and after the event, you can easily download all 
          shared content or view it online at your convenience.
        </p>
      </TutorialStep>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-20" />
    </ol>
  );
}
