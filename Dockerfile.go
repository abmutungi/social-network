# Start with the Go image
FROM golang:1.17

# Set the working directory
WORKDIR /social-network

# Copy the server code into the container
COPY ./backend .

# Build the server
RUN go build -o main .

# Expose the server port
EXPOSE 8080

# Run the server
CMD ["./main"]