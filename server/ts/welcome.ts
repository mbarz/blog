export function printWelcome() {
  const ascii = `
888      888                                                                            
888      888                                                                            
888      888                                                                            
88888b.  888  .d88b.   .d88b.       .d8888b   .d88b.  888d888 888  888  .d88b.  888d888 
888 "88b 888 d88""88b d88P"88b      88K      d8P  Y8b 888P"   888  888 d8P  Y8b 888P"   
888  888 888 888  888 888  888      "Y8888b. 88888888 888     Y88  88P 88888888 888     
888 d88P 888 Y88..88P Y88b 888           X88 Y8b.     888      Y8bd8P  Y8b.     888     
88888P"  888  "Y88P"   "Y88888       88888P'  "Y8888  888       Y88P    "Y8888  888     
                            888                                                          
                      Y8b d88P                             ${new Date().toISOString()}
                        "Y88P"                                              muxe.de                                                           
`;
  console.log(ascii);
}
