$items = Get-ChildItem "../assets" -Filter "*.svg" | foreach { @{ name = $_.name; baseName = [io.path]::GetFileNameWithoutExtension($_.name) + "Icon" } }
$output = $items | foreach { @"
import $($_.baseName) from "../assets/$($_.name)?react";
"@}

$output += @"

export {
    $($items.baseName -join ",`n    "),
};
"@

$output | out-file "./Icons.ts" -encoding UTF8