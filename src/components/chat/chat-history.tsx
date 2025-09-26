import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export function ChatHistory() {
  const mockHistory = [
    "Introduction to Llama 3.1",
    "Yesterday's standup notes",
    "Brainstorming session",
    "Initial project ideas",
    "How to use NVIDIA API",
  ]

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {mockHistory.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {item}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
