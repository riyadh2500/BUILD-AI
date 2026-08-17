# Setup Guide - AI-Powered System Design Builder

## ✅ Application Status

Your application is now **FULLY FUNCTIONAL** and running! 🎉

## 🌐 Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🎯 What's Working

✅ **Navbar** - Project management, save, export, templates, and AI assistant
✅ **Sidebar** - Draggable components organized by category
✅ **Main Canvas** - React Flow diagram with drag-and-drop
✅ **Custom Nodes** - Beautiful component cards with icons
✅ **Properties Panel** - Edit node properties and labels
✅ **AI Assistant** - Chat interface (requires API key)
✅ **Project Manager** - Create, save, and load projects
✅ **Export Manager** - Export as JSON or PNG image
✅ **Template Manager** - Pre-built architecture templates
✅ **State Management** - Zustand with local storage persistence

## 🚀 Quick Start Guide

### 1. Using the Application

1. **Start with a Template** (Optional)
   - Click "Templates" in the navbar
   - Choose from: Microservices, E-Commerce, or Chat App
   - Click on a template to apply it

2. **Create a New Project**
   - Click "Projects" in the navbar
   - Enter a project name
   - Click "Create Project"

3. **Add Components**
   - Browse components in the sidebar (left)
   - Categories: Compute, Storage, Network, Security, Client, Services
   - Drag any component to the canvas

4. **Connect Components**
   - Click and drag from any connection point (dots on nodes)
   - Release on another node to create a connection
   - Lines will appear showing the flow

5. **Edit Component Properties**
   - Click on any component
   - Properties panel appears on the right
   - Edit label, add custom properties (capacity, region, etc.)

6. **Save Your Work**
   - Click "Save" in the navbar
   - Projects are automatically saved to browser storage

7. **Export Your Design**
   - Click "Export" in the navbar
   - Choose JSON (for backup/sharing) or PNG (for presentations)

### 2. Enable AI Assistant Features

To use the AI Assistant, you need a **free** Google Gemini API key:

1. **Get Your Free API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key

2. **Add to Your Project**
   - Open `.env.local` file in the project root
   - Replace `api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```
   - Save the file
   - The server will automatically reload

3. **Use AI Features**
   - Click "AI Assistant" button in the navbar
   - Ask questions about system design
   - Request architecture analysis
   - Get scaling and security recommendations

## 🎨 Features Overview

### Component Library
- **Compute**: Server, Microservice, Container, Kubernetes
- **Storage**: Database, MongoDB, PostgreSQL, Redis, Cache
- **Network**: Load Balancer, CDN, API Gateway, Nginx, Kafka
- **Security**: Firewall, Authentication
- **Client**: Web App, Mobile App, User
- **Services**: Cloud Service, AWS

### Keyboard Shortcuts
- `Delete` or `Backspace`: Delete selected component
- `Shift + Click`: Multi-select components
- `Drag`: Move components on canvas
- Mouse wheel: Zoom in/out

### Project Management
- Create unlimited projects
- Auto-save to browser storage
- Load previous projects
- Export as JSON or PNG
- Import projects from JSON

### AI Assistant Capabilities
- System design consultation
- Architecture analysis
- Scaling strategies
- Security recommendations
- Component suggestions
- Best practices guidance

## 🛠️ Troubleshooting

### Application Not Loading?
1. Refresh the browser (F5 or Ctrl+R)
2. Clear browser cache
3. Check the terminal for error messages

### Components Not Draggable?
1. Make sure you're dragging from the component card in the sidebar
2. Drop the component on the white canvas area

### AI Assistant Not Working?
1. Verify your API key is correctly set in `.env.local`
2. Check that the key doesn't have extra spaces
3. Restart the development server if needed

### Export Not Working?
1. Make sure you have a project loaded
2. For PNG export, ensure you have components on the canvas

## 📚 Technology Stack

- **Frontend**: Next.js 13, React 18
- **Styling**: Tailwind CSS
- **Diagramming**: React Flow
- **State**: Zustand with persistence
- **AI**: Google Gemini AI
- **Icons**: React Icons
- **Export**: html-to-image

## 🎓 Learning Resources

- [React Flow Documentation](https://reactflow.dev/)
- [Google Gemini AI](https://ai.google.dev/)
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Tailwind CSS](https://tailwindcss.com/)

## 💡 Tips & Best Practices

1. **Start Simple**: Begin with a few components and gradually build complexity
2. **Use Templates**: Templates provide solid starting points for common architectures
3. **Label Everything**: Clear labels help others understand your design
4. **Add Properties**: Document important details (regions, capacities, versions)
5. **Connect Logically**: Show data flow and dependencies with connections
6. **Save Frequently**: Use the Save button to persist your work
7. **Ask AI**: Use the AI assistant for design validation and improvements

## 🎉 You're All Set!

Your AI-Powered System Design Builder is ready to use. Start creating amazing architecture diagrams!

For questions or issues, check the main README.md file or the inline documentation in the code.

Happy Designing! 🚀
