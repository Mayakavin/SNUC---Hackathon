{ pkgs, ... }: {
  channel = "stable-24.11"; 

  packages = [
    pkgs.nodejs_22
    pkgs.typescript
    pkgs.openssl.bin
    pkgs.git
  ];

  env = {
    NODE_ENV = "development";
  };

  idx = {
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
      "esbenp.prettier-vscode"
      "dsznajder.es7-react-js-snippets"
    ];

    workspace = {
      onCreate = {
        setup-all = "npm install --prefix backend && npm install --prefix frontend";
      };
      
      onStart = {
        # IMPORTANT: Added '&' at the end so it runs in the background
        # Also added a cleanup command to kill any old zombie ports first
        run-backend = "fuser -k 3000/tcp; cd backend && npm run dev -- --host 0.0.0.0 &";
      };
    };

    previews = {
      enable = true;
      previews = {
        web = {
          # Frontend runs on $PORT (usually 5173 or 9000)
          command = ["npm" "run" "dev" "--prefix" "frontend" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}