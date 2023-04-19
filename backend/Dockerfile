FROM golang:1.17
# Start with the Go image
# Set the working directory
WORKDIR /social-network

# Copy the server code into the container
COPY . .

# Build the server
RUN go build -o main .

# Expose the server port
EXPOSE 8080

# Run the server
CMD ["./main"]