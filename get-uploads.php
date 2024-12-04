<?php
$uploadDir = 'uploads/';
$files = array_diff(scandir($uploadDir), ['.', '..']);
$response = [];

foreach ($files as $file) {
    $filePath = $uploadDir . $file;
    // Read the metadata file (or database) to get the caption
    $metadata = json_decode(file_get_contents("uploads/metadata.json"), true);
    $caption = isset($metadata['caption']) ? $metadata['caption'] : 'No caption available';
    
    $response[] = ['path' => $filePath, 'caption' => $caption];
}

header('Content-Type: application/json');
echo json_encode($response);
?>