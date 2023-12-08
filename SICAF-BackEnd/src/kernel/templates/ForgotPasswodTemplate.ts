export const forgotPasswordTemplate = (url: string) => (
    `<!DOCTYPE html>

    <html
      lang="en"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:PixelsPerInch>96</o:PixelsPerInch
              ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <!--[if !mso]><!-->
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:wght@100;200;300;400;500;600;700;800;900"
          rel="stylesheet"
          type="text/css"
        />
        <!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
    
          body {
            margin: 0;
            padding: 0;
          }
    
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
    
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
    
          p {
            line-height: inherit;
          }
    
          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }
    
          .image_block img + div {
            display: none;
          }
    
          @media (max-width: 520px) {
            .desktop_hide table.icons-inner {
              display: inline-block !important;
            }
    
            .icons-inner {
              text-align: center;
            }
    
            .icons-inner td {
              margin: 0 auto;
            }
    
            .mobile_hide {
              display: none;
            }
    
            .row-content {
              width: 100% !important;
            }
    
            .stack .column {
              width: 100%;
              display: block;
            }
    
            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }
    
            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
        </style>
      </head>
      <body
        style="
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        "
      >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="nl-container"
          role="presentation"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #ffffff;
          "
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-1"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            color: #000000;
                            width: 500px;
                            margin: 0 auto;
                          "
                          width="500"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  font-weight: 400;
                                  text-align: left;
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  padding-bottom: 5px;
                                  padding-top: 5px;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="divider_block block-1"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div align="center" class="alignment">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                          width="100%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 2px solid #744c24;
                                              "
                                            >
                                              <span> </span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-2"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 500px;
                            margin: 0 auto;
                          "
                          width="500"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  font-weight: 400;
                                  text-align: left;
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  padding-bottom: 40px;
                                  padding-top: 40px;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="image_block block-1"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        width: 100%;
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                    >
                                      <div
                                        align="center"
                                        class="alignment"
                                        style="line-height: 10px"
                                      >
                                        <div style="max-width: 100px">
                                          <img
                                            src="https://lh3.googleusercontent.com/pw/ADCreHdHKqz9j5SOok--3qqJB5U10AGlNjYbikKLRfsCkuqzO_DZ1hW6qrEJVDVnYrZOpLtrAMmmfNScRduJTeKNa-zkKynoll4D3sgZ9ly2f4Be9glsUl0arUExTkNu6LTtujKGngbMN17Nmr16piIzEA=w256-h256-s-no-gm?authuser=0"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                              width: 100%;
                                            "
                                            width="100"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="30"
                                  cellspacing="0"
                                  class="heading_block block-2"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <h1
                                        style="
                                          margin: 0;
                                          color: #44270b;
                                          direction: ltr;
                                          font-family: 'Cabin', Arial,
                                            'Helvetica Neue', Helvetica, sans-serif;
                                          font-size: 26px;
                                          font-weight: 700;
                                          letter-spacing: normal;
                                          line-height: 120%;
                                          text-align: center;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                          mso-line-height-alt: 31.2px;
                                        "
                                      >
                                        <span class="tinyMce-placeholder"
                                          >Recuperación de contraseña</span
                                        >
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="paragraph_block block-3"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div
                                        style="
                                          color: #000000;
                                          direction: ltr;
                                          font-family: 'Cabin', Arial,
                                            'Helvetica Neue', Helvetica, sans-serif;
                                          font-size: 18px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 120%;
                                          text-align: left;
                                          mso-line-height-alt: 21.599999999999998px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          Realiza los siguientes pasos para
                                          recuperar tu contraseña si lo solicitaste,
                                          en caso contrario ignora este correo.
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso
                                  ]><style>
                                    #list-r1c0m3 ul {
                                      margin: 0 !important;
                                      padding: 0 !important;
                                    }
                                    #list-r1c0m3 ul li {
                                      mso-special-format: bullet;
                                    }
                                    #list-r1c0m3 .levelOne li {
                                      margin-top: 0 !important;
                                    }
                                    #list-r1c0m3 .levelOne {
                                      margin-left: -20px !important;
                                    }
                                    #list-r1c0m3 .levelTwo li {
                                      margin-top: 0 !important;
                                    }
                                    #list-r1c0m3 .levelTwo {
                                      margin-left: 10px !important;
                                    }
                                    #list-r1c0m3 .levelThree li {
                                      margin-top: 0 !important;
                                    }
                                    #list-r1c0m3 .levelThree {
                                      margin-left: 40px !important;
                                    }
                                  </style><!
                                [endif]-->
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="list_block block-4"
                                  id="list-r1c0m3"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div class="levelOne" style="margin-left: 0">
                                        <ul
                                          class="leftList"
                                          start="1"
                                          style="
                                            margin-top: 0;
                                            margin-bottom: 0;
                                            padding: 0;
                                            list-style-position: inside;
                                            padding-left: 0;
                                            font-weight: 400;
                                            text-align: left;
                                            color: #101218;
                                            direction: ltr;
                                            font-family: Cabin, Arial,
                                              'Helvetica Neue', Helvetica,
                                              sans-serif;
                                            font-size: 18px;
                                            letter-spacing: 0;
                                            line-height: 120%;
                                            mso-line-height-alt: 21.599999999999998px;
                                            list-style-type: disc;
                                          "
                                        >
                                          <li
                                            style="
                                              margin-bottom: 0;
                                              text-align: left;
                                            "
                                          >
                                            Da clic en el botón que aparece a
                                            continuación
                                            <em>"Recuperar contraseña"</em>.
                                          </li>
                                          <li
                                            style="
                                              margin-bottom: 0;
                                              text-align: left;
                                            "
                                          >
                                            Ingresa tu nueva contraseña.
                                          </li>
                                          <li
                                            style="
                                              margin-bottom: 0;
                                              text-align: left;
                                            "
                                          >
                                            Confirma tu nueva contraseña.
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="30"
                                  cellspacing="0"
                                  class="button_block block-5"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div align="center" class="alignment">
                                        <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="hm cgnmgd" style="height:46px;width:204px;v-text-anchor:middle;" arcsize="9%" stroke="false" fillcolor="#9b6b43">
    <w:anchorlock/>
    <v:textbox inset="0px,0px,0px,0px">
    <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:18px">
    <!
                                        [endif]--><a
                                          href="${url}"
                                          style="
                                            text-decoration: none;
                                            display: inline-block;
                                            color: #ffffff;
                                            background-color: #9b6b43;
                                            border-radius: 4px;
                                            width: auto;
                                            border-top: 0px solid transparent;
                                            font-weight: 400;
                                            border-right: 0px solid transparent;
                                            border-bottom: 0px solid transparent;
                                            border-left: 0px solid transparent;
                                            padding-top: 5px;
                                            padding-bottom: 5px;
                                            font-family: 'Cabin', Arial,
                                              'Helvetica Neue', Helvetica,
                                              sans-serif;
                                            font-size: 18px;
                                            text-align: center;
                                            mso-border-alt: none;
                                            word-break: keep-all;
                                          "
                                          target="_blank"
                                          ><span
                                            style="
                                              padding-left: 20px;
                                              padding-right: 20px;
                                              font-size: 18px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              style="
                                                word-break: break-word;
                                                line-height: 36px;
                                              "
                                              >Recuperar contraseña</span
                                            ></span
                                          ></a
                                        ><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="paragraph_block block-6"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div
                                        style="
                                          color: #44270b;
                                          direction: ltr;
                                          font-family: 'Cabin', Arial,
                                            'Helvetica Neue', Helvetica, sans-serif;
                                          font-size: 18px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 120%;
                                          text-align: center;
                                          mso-line-height-alt: 21.599999999999998px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          <em
                                            ><strong
                                              >Este enlace es válido una única
                                              vez</strong
                                            ></em
                                          >
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-3"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 500px;
                            margin: 0 auto;
                          "
                          width="500"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  font-weight: 400;
                                  text-align: left;
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  padding-bottom: 5px;
                                  padding-top: 5px;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="divider_block block-1"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div align="center" class="alignment">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                          width="100%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 2px solid #744c24;
                                              "
                                            >
                                              <span> </span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End -->
      </body>
    </html>`
);