# Use an official lightweight Ubuntu image
FROM ubuntu:latest

# Install Git, OpenSSH (for SSH authentication), and curl
RUN apt update && apt install -y git openssh-client curl

# Set work directory
WORKDIR /app

# Copy SSH keys and Git config if needed (Optional: for SSH authentication)
# ADD ~/.ssh /root/.ssh
# RUN chmod 600 /root/.ssh/id_rsa && chmod 644 /root/.ssh/id_rsa.pub

# Set up a default Git config (Replace with your details)
RUN git config --global user.name "Your Name" && \
    git config --global user.email "your-email@example.com"

# Set the entrypoint to use bash shell
ENTRYPOINT ["/bin/bash"]

