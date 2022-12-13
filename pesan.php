<?php
function dd($var = null)
{
    echo "<pre>";
    print_r($var);
    die;
}
function redirect($value = '', $nama = '')
{
    header("location: " . $value . ".php?to=" . $nama, true, 301);
}

if ($_POST['token'] == 1) {
    $pesan = array(
        'nama' => $_POST['nama'] ?? "Tamu tak diundang",
        'pesan' => $_POST['pesan'] ?? "...",
        'alamat' => $_POST['alamat'] ?? "...",
        'kehadiran_st' => $_POST['kehadiran_st'] ?? 0,
    );

    $filename = 'pesan.json';
    try {
        file_put_contents($filename, json_encode($pesan) . "\n", FILE_APPEND | LOCK_EX);
    } catch (\Throwable $th) {
        dd($th);
    }
    //
    redirect('index', $_POST['nama']);
}

if($_GET['pesan']){
    $file = file_get_contents("pesan.json", true) or die("Unable to get content!");
    $file = explode("\n", $file);
    echo json_encode($file);
}