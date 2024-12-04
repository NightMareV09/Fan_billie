<?php
// Check if a file is uploaded
if (isset($_FILES['fan-art'])) {
    $uploadDir = 'uploads/'; // Directory to store uploaded files
    $uploadFile = $uploadDir . basename($_FILES['fan-art']['name']);
    
    // Ensure the directory exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Save the caption
    $caption = isset($_POST['caption']) ? $_POST['caption'] : 'No caption provided';
    
    // Move the uploaded file to the desired directory
    if (move_uploaded_file($_FILES['fan-art']['tmp_name'], $uploadFile)) {
        // Save the image and caption details in a file or database
        file_put_contents("uploads/metadata.json", json_encode([
            'path' => $uploadFile,
            'caption' => $caption
        ]) . "\n", FILE_APPEND);
        
        echo json_encode(['status' => 'success', 'path' => $uploadFile, 'caption' => $caption]);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to save the file.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No file uploaded.']);
}
?>