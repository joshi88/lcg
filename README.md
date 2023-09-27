<?php

// Your URL with parameters
$url = 'https://example.com/authenticate';

// Parameters to send in the POST request
$params = [
    'param1' => 'value1',
    'param2' => 'value2',
    'param3' => 'value3'
];

// Convert parameters to a URL-encoded string
$postData = http_build_query($params);

// Set up cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the cURL request
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
    // Handle the error appropriately
}

// Close cURL session
curl_close($ch);

// Parse the response to extract the bearer token
$data = json_decode($response, true);

if (isset($data['token'])) {
    // The bearer token is in $data['token']
    $bearerToken = $data['token'];
    echo 'Bearer Token: ' . $bearerToken;
} else {
    // Handle the case where the token is not found in the response
    echo 'Bearer token not found in response.';
}

?>
