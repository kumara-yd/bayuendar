<?php
function dd($var = null)
{
    echo "<pre>";
    print_r($var);
    die;
}
function redirect($value = '', $nama = '')
{
    $url = 'https://kumara-yd.github.io/bayuendar/index.html';
    if (!empty($value)) {
        header("location: " . $value . ".php?to=" . $nama, true, 301);
    } else {
        header('location:' . $url . '?to=' . $nama, true, 301);
    }
}

if (isset($_POST['token']) == 1) {
    $pesan = array(
        'nama' => $_POST['nama'],
        'pesan' => $_POST['pesan'],
        'alamat' => $_POST['alamat'],
        'kehadiran_st' => $_POST['kehadiran_st'],
    );

    $filename = 'pesan.json';
    try {
        file_put_contents($filename, json_encode($pesan) . "\n", FILE_APPEND | LOCK_EX);
    } catch (\Throwable $th) {
        dd($th);
    }
    //
    header("Access-Control-Allow-Origin: *");

    redirect(null, $_POST['nama']);
}

if(isset($_GET['pesan'])){
    $file = file_get_contents("pesan.json", true) or die("Unable to get content!");
    $file = explode("\n", $file);
    //
    header("Access-Control-Allow-Origin: *");

    // echo $_GET['callback'] . '(' . json_encode($file) . ')';
    echo json_encode($file);
    die;
}

if(isset($_GET['env'])){
    error_reporting(0);
    $url = ".env";
    $file = file_get_contents($url, true) or die("Unable to get content!");
    $file = explode("\n", $file);
    $env = array();
    $env['kepada'] = $_GET['to'];
    foreach ($file as $value) {
        $tmp = explode('=', $value);
        $env[$tmp[0]] = $tmp[1];
    }
    header("Access-Control-Allow-Origin: *");
    //
    // echo $_GET['callback'] . '(' . json_encode($env) . ')';
    echo json_encode($env);
    die;
}

if(isset($_GET['gallery'])){
    $dir = "images/gallery";
    $gal = [];
    for ($i=1; $i < 17; $i++) {
        $value = ($i < 10) ? 'gal0' : 'gal';
        $value = $value . $i . '.png';
        $gal[] = [
                'src' => $dir . "/" . $value,
                'thumb' => $dir . "/" . $value,
            ];
    }
    header("Access-Control-Allow-Origin: *");
    // echo $_GET['callback'] . '(' . json_encode($gal) . ')';
    echo json_encode($gal);
    die;
}

/*
<?php


$dir = "images/gallery";
$files1 = scandir($dir);
$gal = [];
foreach ($files1 as $key => $value) {
	if (!in_array($key, [0, 1])) {
		$gal[] = [
			'src' => $dir . "/" . $value,
			'thumb' => $dir . "/" . $value,
		];
	}
}
?>
*/
