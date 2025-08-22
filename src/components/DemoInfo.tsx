import React from "react";
import "./DemoInfo.css";

const DemoInfo: React.FC = () => {
  return (
    <div className="demo-info">
      <h3>🚀 Getting Started</h3>
      <div className="setup-steps">
        <div className="step">
          <span className="step-number">1</span>
          <div className="step-content">
            <h4>Create Azure Computer Vision Resource</h4>
            <p>
              Go to{" "}
              <a
                href="https://portal.azure.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Azure Portal
              </a>{" "}
              and create a Computer Vision resource
            </p>
          </div>
        </div>

        <div className="step">
          <span className="step-number">2</span>
          <div className="step-content">
            <h4>Get API Credentials</h4>
            <p>
              Copy your API key and endpoint from the "Keys and Endpoint"
              section
            </p>
          </div>
        </div>

        <div className="step">
          <span className="step-number">3</span>
          <div className="step-content">
            <h4>Configure Environment</h4>
            <p>
              Update the <code>.env</code> file with your credentials:
            </p>
            <div className="code-block">
              <code>
                VITE_AZURE_VISION_KEY=your_api_key
                <br />
                VITE_AZURE_VISION_ENDPOINT=your_endpoint
              </code>
            </div>
          </div>
        </div>

        <div className="step">
          <span className="step-number">4</span>
          <div className="step-content">
            <h4>Start Analyzing!</h4>
            <p>Upload an image and see what objects Azure can detect</p>
          </div>
        </div>
      </div>

      <div className="demo-note">
        <p>
          <strong>Note:</strong> The free tier allows 5,000 API calls per month
          and 20 calls per minute.
        </p>
      </div>
    </div>
  );
};

export default DemoInfo;
