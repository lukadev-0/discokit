import Image from "next/image";
import { useRouter } from "next/router";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Logo } from "~/components/Logo";
import poweredByVercel from "~/images/powered-by-vercel.svg";

const config: DocsThemeConfig = {
  logo: <Logo className="h-5" />,
  project: {
    link: "https://github.com/lukadev-0/discokit",
  },
  docsRepositoryBase: "https://github.com/lukadev-0/discokit/blob/main/docs/",
  banner: {
    dismissible: false,
    text: <p>Discokit is still a work in progress!</p>,
  },
  useNextSeoProps: () => {
    const { asPath } = useRouter();
    const { title } = useConfig();

    const isReference =
      asPath === "/reference" || asPath.startsWith("/reference/");

    return {
      titleTemplate:
        asPath === "/"
          ? "Discokit – The modern SDK for Discord bots"
          : isReference
          ? "Reference: %s – Discokit"
          : "%s – Discokit",
      openGraph: {
        siteName: "Discokit",
        title:
          asPath === "/"
            ? "The modern SDK for Discord bots"
            : isReference
            ? `Reference: ${title}`
            : title,
      },
    };
  },
  head: null,
  footer: {
    text: (
      <div>
        <p>
          MIT {new Date().getFullYear()} ©{" "}
          <a href="https://nextra.site" target="_blank">
            Discokit Contributors
          </a>
          .
        </p>

        <div className="mt-4">
          <a href="https://vercel.com/?utm_source=discokit&utm_campaign=oss">
            <Image alt="Powered by Vercel" src={poweredByVercel} />
          </a>
        </div>
      </div>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
};

export default config;
