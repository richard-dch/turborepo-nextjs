'use client';

import { useState } from 'react';
import { ChatContainer, ChatSidebar, type Message, type Conversation } from '@seeyou-eu/ui';
import { Sparkles, Bot } from 'lucide-react';

// Mock conversations data
const mockConversations: Conversation[] = [
	{
		id: '1',
		title: 'Getting Started with React',
		lastMessage: 'Sure! React is a JavaScript library for building user interfaces...',
		timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
		isPinned: true,
	},
	{
		id: '2',
		title: 'TypeScript Best Practices',
		lastMessage: 'Here are some TypeScript best practices you should follow...',
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
		isFavorite: true,
		unreadCount: 3,
	},
	{
		id: '3',
		title: 'Building a Chat Application',
		lastMessage: "To build a chat application, you'll need to consider...",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
	},
	{
		id: '4',
		title: 'Database Design Patterns',
		lastMessage: 'When designing a database, consider these patterns...',
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
		isArchived: true,
	},
];

// Mock initial messages
const initialMessages: Message[] = [
	{
		id: '1',
		content: "Hello! I'm your AI assistant. How can I help you today?",
		role: 'assistant',
		timestamp: new Date(Date.now() - 1000 * 60 * 10),
		avatar: {
			fallback: 'AI',
		},
	},
	{
		id: '2',
		content: 'Can you explain how to use React hooks?',
		role: 'user',
		timestamp: new Date(Date.now() - 1000 * 60 * 9),
		avatar: {
			fallback: 'U',
		},
	},
	{
		id: '3',
		content: `# React Hooks

React Hooks are functions that let you "hook into" React features from function components. Here are the most commonly used hooks:

## useState
\`\`\`javascript
const [count, setCount] = useState(0);

// Example usage
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

The \`useState\` hook lets you add state to functional components. It returns an array with two elements:
- The current state value
- A function to update it

## useEffect
\`\`\`javascript
useEffect(() => {
  // Side effect code
  document.title = \`Count: \${count}\`;
  
  // Optional cleanup function
  return () => {
    console.log('Cleanup');
  };
}, [count]); // Dependencies array
\`\`\`

The \`useEffect\` hook lets you perform side effects in function components.

## Comparison Table

| Hook | Purpose | When to Use |
|------|---------|-------------|
| useState | Local component state | When you need to track values that change |
| useEffect | Side effects | API calls, subscriptions, DOM updates |
| useContext | Consume context | Accessing global state |
| useReducer | Complex state logic | Multiple sub-values or complex state transitions |
| useMemo | Memoize values | Expensive calculations |
| useCallback | Memoize functions | Prevent unnecessary re-renders |

## Task List Example

Here's what you need to implement a custom hook:

- [x] Define the hook function
- [x] Use built-in hooks inside
- [ ] Return values/functions
- [ ] Test the hook
- [ ] Document usage

## Custom Hook Example

\`\`\`typescript
// useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Save to local storage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
\`\`\`

> **Note:** This hook automatically syncs with localStorage and handles SSR gracefully.

---

Would you like me to explain any specific hook in more detail? You can also check out the [official React documentation](https://react.dev/reference/react) for more information.`,
		role: 'assistant',
		timestamp: new Date(Date.now() - 1000 * 60 * 8),
		avatar: {
			fallback: 'AI',
		},
	},
];

const suggestions = ['What is React?', 'How do I use TypeScript?', 'Explain async/await', 'What are design patterns?', 'How to optimize performance?'];

export default function Home() {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [isLoading, setIsLoading] = useState(false);
	const [activeConversationId, setActiveConversationId] = useState('1');
	const [conversations, setConversations] = useState(mockConversations);

	const handleSendMessage = async (content: string) => {
		// Add user message
		const userMessage: Message = {
			id: Date.now().toString(),
			content,
			role: 'user',
			timestamp: new Date(),
			avatar: {
				fallback: 'U',
			},
		};
		setMessages((prev) => [...prev, userMessage]);

		// Simulate AI response
		setIsLoading(true);
		setTimeout(() => {
			const aiMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: `I received your message: "${content}". This is a simulated response to demonstrate the chat interface. In a real application, this would be connected to an AI service.`,
				role: 'assistant',
				timestamp: new Date(),
				avatar: {
					fallback: 'AI',
				},
			};
			setMessages((prev) => [...prev, aiMessage]);
			setIsLoading(false);
		}, 1500);
	};

	const handleNewConversation = () => {
		const newConv: Conversation = {
			id: Date.now().toString(),
			title: 'New Conversation',
			lastMessage: 'Start a new conversation...',
			timestamp: new Date(),
		};
		setConversations((prev) => [newConv, ...prev]);
		setActiveConversationId(newConv.id);
		setMessages([]);
	};

	const handleDeleteConversation = (id: string) => {
		setConversations((prev) => prev.filter((c) => c.id !== id));
		if (id === activeConversationId && conversations.length > 1) {
			const nextConv = conversations.find((c) => c.id !== id);
			if (nextConv) setActiveConversationId(nextConv.id);
		}
	};

	const handlePinConversation = (id: string) => {
		setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, isPinned: !c.isPinned } : c)));
	};

	const handleFavoriteConversation = (id: string) => {
		setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c)));
	};

	const handleArchiveConversation = (id: string) => {
		setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, isArchived: !c.isArchived } : c)));
	};

	const handleRenameConversation = (id: string, newTitle: string) => {
		setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c)));
	};

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<div className="w-80 border-r">
				<ChatSidebar
					conversations={conversations}
					activeConversationId={activeConversationId}
					onConversationClick={setActiveConversationId}
					onNewConversation={handleNewConversation}
					onDeleteConversation={handleDeleteConversation}
					onArchiveConversation={handleArchiveConversation}
					onPinConversation={handlePinConversation}
					onFavoriteConversation={handleFavoriteConversation}
					onRenameConversation={handleRenameConversation}
				/>
			</div>

			{/* Chat Area */}
			<div className="flex-1 flex flex-col">
				<ChatContainer
					messages={messages}
					onSendMessage={handleSendMessage}
					isLoading={isLoading}
					suggestions={suggestions}
					onSuggestionClick={(suggestion) => handleSendMessage(suggestion)}
					header={
						<div className="flex items-center gap-3">
							<div className="p-2 bg-primary/10 rounded-lg">
								<Bot className="h-5 w-5 text-primary" />
							</div>
							<div>
								<h2 className="font-semibold">AI Assistant</h2>
								<p className="text-xs text-muted-foreground">Powered by ModernMiracle AI</p>
							</div>
						</div>
					}
					welcomeMessage={
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Sparkles className="h-4 w-4" />
							<span>Ask me anything about programming, technology, or general topics!</span>
						</div>
					}
					inputProps={{
						placeholder: 'Ask me anything...',
						features: {
							attachments: true,
							voice: true,
							commands: true,
						},
						showWordCount: true,
					}}
					messageProps={{
						markdown: true,
						actions: {
							onCopy: () => console.log('Copied!'),
							onRegenerate: () => console.log('Regenerate'),
							onRatePositive: () => console.log('Rated positive'),
							onRateNegative: () => console.log('Rated negative'),
						},
					}}
				/>
			</div>
		</div>
	);
}
