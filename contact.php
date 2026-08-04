<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html#contact');
    exit;
}

function clean_input($value) {
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

$name = clean_input($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = clean_input($_POST['phone'] ?? '');
$subject = clean_input($_POST['subject'] ?? 'Website Contact Form');
$message = clean_input($_POST['message'] ?? '');

if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.html#contact');
    exit;
}

$to = 'info@primeaxis.dev';
$email_subject = 'New Inquiry: ' . $subject;
$email_body = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\n\nMessage:\n{$message}";
$headers = "From: noreply@primeaxis.dev\r\nReply-To: {$email}\r\n";

$sent = @mail($to, $email_subject, $email_body, $headers);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Contact Status | PrimeAxis</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="assets/css/style.css" rel="stylesheet" />
</head>
<body>
  <section class="section-space">
    <div class="container text-center">
      <h1 class="section-title"><?php echo $sent ? 'Message Sent' : 'Message Received'; ?></h1>
      <p><?php echo $sent ? 'Thank you. We will get back to you.' : 'Thank you. Your message has been recorded. Mail delivery is not configured on this server yet.'; ?></p>
      <a class="btn btn-brand" href="index.html">Back to Home</a>
    </div>
  </section>
</body>
</html>
