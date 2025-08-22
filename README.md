# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🔍 What Is This? - Image Object Recognition

A modern web application built with React, TypeScript, and Vite that uses Azure Computer Vision API to identify objects in uploaded images.

## Features

- 📱 **Drag & Drop Image Upload** - Easy image selection with drag and drop support
- 🔍 **Object Detection** - Identify objects in images with confidence scores
- 🏷️ **Smart Tagging** - Automatic tagging of image content
- 📝 **Image Description** - Natural language descriptions of images
- 📊 **Visual Results** - Clean, intuitive display of analysis results
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Azure Computer Vision resource

## Azure Setup

1. **Create Azure Computer Vision Resource:**

   - Go to [Azure Portal](https://portal.azure.com)
   - Create a new "Computer Vision" resource
   - Choose your subscription, resource group, and region
   - Select pricing tier (F0 for free tier)

2. **Get API Credentials:**
   - Navigate to your Computer Vision resource
   - Go to "Keys and Endpoint" section
   - Copy your API key and endpoint URL

## Installation & Setup

1. **Clone and Install:**

   ```bash
   cd what-is-this
   npm install
   ```

2. **Configure Environment:**

   - Copy `.env` file and update with your Azure credentials:

   ```env
   VITE_AZURE_VISION_KEY=your_azure_vision_api_key_here
   VITE_AZURE_VISION_ENDPOINT=https://your-resource-name.cognitiveservices.azure.com/
   ```

3. **Start Development Server:**

   ```bash
   npm run dev
   ```

4. **Open Application:**
   - Navigate to `http://localhost:5173`
   - Upload an image and see the magic! ✨

## Usage

1. **Upload Image:**

   - Click the upload area or drag and drop an image
   - Supported formats: PNG, JPG, GIF (up to 10MB)

2. **View Results:**
   - **Description:** Natural language description of the image
   - **Objects:** Detected objects with confidence scores
   - **Tags:** Relevant tags with confidence percentages

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** CSS3 with custom components
- **AI Service:** Azure Computer Vision API
- **HTTP Client:** Axios

## Project Structure

```
src/
├── components/
│   ├── ImageUpload.tsx        # Image upload component
│   ├── ImageUpload.css        # Upload styling
│   ├── AnalysisResults.tsx    # Results display component
│   └── AnalysisResults.css    # Results styling
├── services/
│   └── azureVision.ts         # Azure Computer Vision service
├── App.tsx                    # Main application component
├── App.css                    # Main styling
└── main.tsx                   # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Usage Limits

- **Free Tier (F0):** 20 calls per minute, 5,000 calls per month
- **Standard Tier (S1):** 10 calls per second

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

1. **"Azure Computer Vision client not initialized"**

   - Check your `.env` file has correct API key and endpoint
   - Ensure environment variables start with `VITE_`

2. **CORS Issues**

   - Azure Computer Vision API supports CORS for browser requests
   - Ensure your endpoint URL is correct

3. **Image Analysis Fails**
   - Check image format (PNG, JPG, GIF supported)
   - Verify image size is under 10MB
   - Ensure stable internet connection

### Support

For issues and questions:

- Check Azure Computer Vision [documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/)
- Review Azure service health status
- Check browser console for detailed error messages

---

Built with ❤️ using React + TypeScript + Azure AI

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
