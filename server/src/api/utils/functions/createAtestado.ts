export function createAtestado(record: { diagnosis: { hospitalInfo: { name: string; addressLine: string; city: string; }; description: string; diseaseCode: string; }; dateOfVisit: string; doctor: string; doctorId: string; }) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medical Certificate</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            padding: 40px;
            background: #fff;
            color: #333;
        }
        .container {
            border: 1px solid #ccc;
            padding: 20px;
            max-width: 210mm;
            min-height: 297mm;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .content {
            margin-bottom: 20px;
            text-align: center;
        }
        .signature {
            text-align: center;
            margin-top: 40px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 0.8em;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <p><strong>${record.diagnosis.hospitalInfo.name}</strong></p>
        <p>${record.diagnosis.hospitalInfo.addressLine}</p>
        <p>${record.diagnosis.hospitalInfo.city}</p>
    </div>
    <div class="content">
        <h2>Atestado Médico</h2>
        <p>${record.diagnosis.description}</p>
        <p><strong>Código da Doença:</strong> ${record.diagnosis.diseaseCode}</p>
        <p><strong>Local e Data:</strong> ${record.dateOfVisit}</p>
    </div>
    <div class="signature">
        <p>__________________________</p>
        <p><strong>${record.doctor}</strong></p>
        <p>CRM ${record.doctorId}</p>
    </div>
    <div class="footer">
        <p>Aceito a Colocação do CID. Assinado</p>
        <p>Código de Autenticação: ${Math.random()*100000}</p>
        <p>Solicitada da Senha: ${record.dateOfVisit}</p>
    </div>
</div>
</body>
</html>`
}